var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

var secret = require('./secret');
// app.use('/api/admin', jwt({secret: secret}));

app.use(require('json-middleware').middleware());

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./auth-setup')(app)

require('./routes/api')(app);
require('./routes/booking')(app);
require('./routes/google-auth')(app);

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('Error message: ' + err.message);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('Error message: ' + err.message);
        // res.render('error', {
        //     message: err.message,
        //     error: {}
        // });
    });
}

module.exports = app;

