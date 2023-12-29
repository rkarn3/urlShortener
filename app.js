const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

let indexRouter = require('./routes/index');
let createShortUriRouter = require('./routes/create');
let getUriRouter = require('./routes/fetchUri');

const app = express();
connectDB();

let port = 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/create-short-url', createShortUriRouter);
app.use('/get-url', getUriRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
