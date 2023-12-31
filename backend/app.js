var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
const database = require('./database/db');
database();

var app = express();

app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Enable credentials (cookies, authorization headers)
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
