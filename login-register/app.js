var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//替换为html的
app.engine("html",require("ejs").renderFile);//此句可替换为
//app.engine("html",require("ejs").__express);
app.set("view engine","html");

//这是使用ejs模板文件的版本，替换为使用html版本的
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//以下为所有页面配置路由
app.use('/login',indexRouter);//登录页面
app.use('/register',indexRouter);//注册页面
app.use('/home',indexRouter);//主页页面
app.use('/logout',indexRouter);//登出页面


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
