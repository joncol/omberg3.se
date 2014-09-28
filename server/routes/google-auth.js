(function () {
    'use strict';

    var passport = require('passport');

    var jwt = require('express-jwt');
    var secret = require('../secret');

    module.exports = function (app) {
        app.get('/auth/google',
                passport.authenticate('google'),
                function (req, res) {});

        app.get('/auth/google/return', passport.authenticate('google', {
            failureredirect: '/login'
        }), function (req, res) {
            console.log('Google login successful');
            res.redirect('/')
        });
    };

}());


