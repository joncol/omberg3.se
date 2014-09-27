(function () {
    'use strict';

    var jwt = require('express-jwt');
    var secret = require('../secret');

    module.exports = function (app) {
        app.get('/api/admin/cp', jwt({ secret: secret }), function (req, res) {
            console.log('API call yo');
            res.json({ data: 'yolo fosho' });
            // if (!req.user.admin) {
            //     return res.status(401).end();
            // }
            // res.status(200).end();
        });
    };
}());

