const express = require('express')
const bodyParser = require("body-parser")
const hbs = require('hbs')
const path = require('path')
const config = require('config')
const favicon = require('serve-favicon')
const debug = require('debug')('echo:app')

const app = express();

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) 

// session
const session = require('express-session');
// cookie
const cookieParser = require('cookie-parser');

app.use(cookieParser());

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
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Cache-Control', 'Max-age=0');  // 强缓存
  next();
})

// router
const proxy = require('./routes/proxy')
app.use('/proxy', proxy)

// mode router
const mode = config.get('MODE');
if( mode !== 'db' && mode !== 'file' ) {
  debug('please set the correct mode');
}

if( mode === 'db' ) {
  debug('you are using the database mode')
  const duser = require('./routes/duser')
  app.use('/duser', duser)
}else if( mode === 'file' ) {
  debug('you are using the file mode')  
  const fuser = require('./routes/fuser')
  app.use('/fuser', fuser)
}



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
