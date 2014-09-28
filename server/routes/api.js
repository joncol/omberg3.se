(function () {

'use strict';

var Promise = require("bluebird");

var passport = require('passport');
var google = require('googleapis');

var jwt = require('express-jwt');
require('../secret');

Promise = require("bluebird");

var gcal = google.calendar("v3");
Promise.promisifyAll(gcal.acl);
Promise.promisifyAll(gcal.calendars);
Promise.promisifyAll(gcal.calendarList);
Promise.promisifyAll(gcal.events);

module.exports = function (app) {
    app.get('/api/admin/cp',
            // jwt({ secret: SERVER_SECRET }),
            // passport.authenticate('google'),
            function (req, res) {
                var serviceAccountEmail = '213625281341-tb56f5kobleuegc1dn7n39fl4hk3p0ok@developer.gserviceaccount.com';
                var serviceAccountKeyFile = 'my-project-key.pem';

                var jwt = new google.auth.JWT(serviceAccountEmail,
                                              serviceAccountKeyFile, null,
                                              ['https://www.googleapis.com/auth/calendar']);

                jwt.authorize(function (err, result) {
                    if (err) {
                        res.status(401).end();
                    } else {
                        gcal.calendarList.listAsync({ auth: jwt })
                            .then(function (calendars) {
                                console.log("found " + calendars[0].items.length + " calendars: ");
                                calendars[0].items.forEach(function (c) {
                                    console.log("  ID: " + c.id);
                                });
                            });

                        res.json({ data: 'yolo fosho' });
                    }
                });


                // if (!req.user.admin) {
                //     return res.status(401).end();
                // }
                // res.status(200).end();
            });
};

}());

