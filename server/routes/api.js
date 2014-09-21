'use strict';

var jwt = require('express-jwt');
var secret = require('../secret');

module.exports = function (app) {
    app.get('/api/admin/cp', jwt({ secret: secret }), function (req, res) {
        if (!req.user.admin) {
            return res.status(401).end();
        }
        res.status(200).end();
    });
};

