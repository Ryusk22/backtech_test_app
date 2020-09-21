const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

process.env.SECRET_KEY = 'secret';

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        req.flash('error', 'ユーザーが見つかりません');
        throw new Error('ユーザーが見つかりません');
      }
      if (bcrypt.compareSync(password, user.password)) {
      // user_idをセッションに詰める
        const { session } = req;
        session.userId = user.id;
        // ログインしていない状態で、ログイン後の画面のURLを入力した後に
        // ログイン画面を表示し、ログイン成功後に入力したURLの画面を表示
        if (req.session.originalUrl) {
          res.redirect(req.session.originalUrl);
        } else if (req.session.originalUrl === '/logout') {
          res.redirect('/home');
        }
        res.redirect('/home');
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
