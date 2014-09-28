'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = require('../secret');

module.exports = function (req, res, next) {
    console.log('In googleServiceAccount auth func');
    passport.authenticate('googleServiceAccount', function (err, user, info) {
        console.log('In googleServiceAccount callback func');
        if (err) {
            console.log('error');
            return res.status(401).send({ message: "Unknown error" });
        }

        next();
    })(req, res, next);
};

