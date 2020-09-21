const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
  const { session } = req;
  if (session.userId) {
    User.findOne({ where: { id: session.userId } })
      .then((user) => {
        if (!user) {
          throw new Error('ユーザーが見つかりません');
        }
        res.render('extra');
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
