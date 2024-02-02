var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function init() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mustafa-mehdi')    
        console.log('Database is up and running');
    } catch (error) {
        console.log('Database error', error);
    }
}


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);


module.exports = app;

init();