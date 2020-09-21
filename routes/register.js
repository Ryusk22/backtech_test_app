const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

const csrfProtection = csrf();
router.use(csrfProtection);

process.env.SECRET_KEY = 'secret';

router.use(bodyParser.urlencoded({
  extended: true,
}));

// 新規登録画面
router.get('/', (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;

  // bcrypt でハッシュ化してusernameとパスワードを保存
  // genSaltSyncで変数saltを作り、
  // hash作成の際にそれを第2引数にしないとcompareSyncがうまく動作しない
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => {
    // user_idをセッションに詰める
      const { session } = req;
      session.userId = user.id;
      res.redirect('/home');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
