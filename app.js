var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');



var routes = require('./routes/index');
var users = require('./routes/users');
var questions=require('./routes/questions');
var search=require('./routes/search');// for admin to add, update, delete and find any question.
var app = express();
//app.use(app.router);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//database setup
/*var mongojs=require('mongojs');
var url='mongodb://localhost:27017/appdb';
var db=mongojs(url);*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'uploads')));
app.use('/', routes);
app.use('/users', users);
app.use('/questions',questions);
app.use('/search',search);
app.listen(7000,function(){
console.log("Hello World");
});

app.get('/',function(req,res){
      res.send("index.html");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
