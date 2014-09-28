(function () {

'use strict';

var passport = require('passport');
var isGoogleAuthenticated = require('../middleware/is-google-authenticated')

var jwt = require('express-jwt');
var secret = require('../secret');

module.exports = function (app) {
    app.get('/api/admin/cp',
            // jwt({ secret: secret }),
            isGoogleAuthenticated,
            function (req, res) {
                console.log('in da API yo nigga pleaaaze')
                res.json({ data: 'yolo fosho' });

                // if (!req.user.admin) {
                //     return res.status(401).end();
                // }
                // res.status(200).end();
            });
};

}());

