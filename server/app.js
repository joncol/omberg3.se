var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressSession = require("express-session");
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
var mongoose = require("mongoose")

var app = express();

var booking = require("./routes/booking")(app);
var User = require("./models/user.js")

// view engine setup
// app.set('views", path.join(__dirname, "views'));
// app.set("view engine", "jade");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

function authSerializer(user, done) {
    serializeLocalUser(user, done);
    // if (user.authType == "local")
    //     serializeLocalUser(user, done);
}

function serializeLocalUser(user, done) {
    done(null, {
        username: user.username,
        authType: user.authType,
        isAdmin: user.isAdmin
    });
}

function authDeserializer(user, done) {
    done(null, user);
}

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: "Ogiltigt användarnamn" });
        }

        if (user.password != password) {
            return done(null, false, { message: "Ogiltigt lösenord" });
        }

        return done(null, {
            username: user.username,
            authType: 'local',
            isAdmin: true
        });
    });
}));

passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost/omberg3Users")

var login = require("./routes/login")(app, passport);

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

