var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var expressSession = require("express-session");

var app = express();

var booking = require("./routes/booking")(app);

// view engine setup
// app.set('views", path.join(__dirname, "views'));
// app.set("view engine", "jade");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(expressSession({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: false
// }));

require("./auth-setup")(app)

/**
 * Development Settings
 */
if (app.get("env") === "development") {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, "../client")));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, "../client/.tmp")));
    app.use(express.static(path.join(__dirname, "../client/app")));

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get("env") === "production") {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, "/dist")));

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;

