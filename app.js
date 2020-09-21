const express = require('express');
// HTML(ejs)のformのinputに入力された値を受け取れるようにするもの
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const redirectLogin = (req, res, next) => {
  const { session } = req;
  session.originalUrl = req.originalUrl;
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
};

const TWE_HOURS = 1000 * 60 * 60 * 2;
const {
  PORT = 3000,

  SESS_NAME = 'sid',
  SESS_SECRET = 'sess_secret',
  SESS_LIFETIME = TWE_HOURS,
} = process.env;

const app = express();
// テンプレートエンジンの指定
app.set('view engine', 'ejs');

app.use(cookieParser('keyboard cat'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  // 毎回セッションを作成しない
  resave: false,
  // 未初期化状態のセッションを保存しない
  saveUninitialized: false,
  // 暗号化に利用するキーを設定
  secret: SESS_SECRET,
  cookie: {
    // 生存期間は2時間
    maxAge: SESS_LIFETIME,
    // httpsを使用しない
    secure: false,
  },
}));
app.use(flash());

app.use(express.json());
app.use(expressLayouts);
app.use('/home', redirectLogin, require('./routes/home'));
app.use('/extra', redirectLogin, require('./routes/extra'));
app.use('/login', redirectHome, require('./routes/login'));
app.use('/register', redirectHome, require('./routes/register'));
app.use('/forgot', require('./routes/forgot'));

app.get('/', redirectLogin, (req, res) => {
  const { session } = req;
  if (session.userId) {
    res.render('index', {
      user_id: session.userId,
    });
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/home');
    }
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  });
});

app.listen(PORT, () => console.log(
  `http://localhost:${PORT}`,
));
