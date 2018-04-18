const express = require('express')
const bodyParser = require("body-parser")
const debug = require('debug')('echo:app')
const hbs = require('hbs')
const path = require('path')

const app = express();

// session
const session = require('express-session');

app.use(session({
  name: 'echo-session', // response和request中session id的名字
  secret: "echo", // 用来对session id相关的cookie进行签名
  resave: false,  // 是否每次都重新保存会话，建议false
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  cookie: {
    httpOnly: false
  }
}));

// post
app.use(bodyParser.json()); // 处理application/json
app.use(bodyParser.urlencoded({
  extended: false
})); // 处理URL-encoded 

// view engine setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// 跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// router
const index = require('./routes/index')
const proxy = require('./routes/proxy')

app.use('/index', index)
app.use('/proxy', proxy)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.err = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
