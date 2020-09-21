const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
require('dotenv').config();

const saltRounds = 10;

const generateResetToken = () => new Promise((resolve, reject) => {
  crypto.randomBytes(20, (err, buf) => {
    if (err) reject(err);
    else {
      const resetToken = buf.toString('hex');
      resolve(resetToken);
    }
  });
});

// forgot password
router.get('/', (req, res) => {
  res.render('forgot');
});

// NEW forgot post
router.post('/', async (req, res, next) => {
  try {

    const resetToken = await generateResetToken();

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      req.flash('error', 'そのメールアドレスのアカウントは存在しません。');
      throw 'user not found.';
    }
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour in ms

    await User.update(
      {
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpires: user.resetPasswordExpires,
      },
      { where: { id: user.id } },
    )
      .catch((err) => {
        next(err);
      });
    // TODO: 環境変数がうまく動作しないので直書き
    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAILPW,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL,
      subject: 'パスワード再設定のご案内',
      text: `${'パスワードを再設定してください。'
        + 'http://'}${req.headers.host}/forgot/reset/${resetToken}\n\n`
        + 'このメールに心当たりのない方は無視してください。',
    };

    await	smtpTransport.sendMail(mailOptions);
    req.flash('success', `パスワードリセット用のメールは${user.email}に送信されました`);
    res.redirect('/forgot');
  } catch (error) {
    res.redirect('/forgot');
  }
});

router.get('/reset/:token', async (req, res) => {
  const user = await User.findOne({ where: { resetPasswordToken: req.params.token } });
  if (!user || user.resetPasswordToken > Date.now()) {
    req.flash('error', 'パスワードリセットトークンが正しくないか、有効期限が切れています。');
    return res.redirect('/forgot');
  }
  res.render('reset', { token: req.params.token });
});

router.post('/reset/:token', async (req, res, next) => {
  const user = await User.findOne({ where: { resetPasswordToken: req.params.token } });
  if (!user || user.resetPasswordToken > Date.now()) {
    req.flash('error', 'パスワードリセットトークンが正しくないか、有効期限が切れています。');
    return res.redirect('back');
  }
  if (req.body.password === req.body.confirm) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { session } = req;
    session.userId = user.id;

    await User.update(
      {
        resetPasswordToken: null,
        resetPasswordExpires: null,
        password: hash,
      },
      { where: { id: user.id } },
    )
      .catch((err) => {
        next(err);
      });
  } else {
    req.flash('error', 'パスワードが一致しません。');
    return res.redirect('back');
  }
  res.redirect('/home');
});

module.exports = router;
