const express = require('express');
const router = express.Router();
const User = require('../models/User');

// HOME表示
router.get('/', (req, res, next) => {
  const { session } = req;
  if (session.userId) {
    User.findOne({ where: { id: session.userId } })
      .then((user) => {
        if (!user) {
          req.flash('error', 'ユーザーが見つかりません');
          throw new Error('ユーザーが見つかりません');
        }
        res.render('home', {
          user,
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
