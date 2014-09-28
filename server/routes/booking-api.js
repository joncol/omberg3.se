(function () {

'use strict';

require('es6-shim')
var Promise = require('bluebird');

var passport = require('passport');
var google = require('googleapis');
var moment = require('moment');

var jwt = require('express-jwt');
require('../secret');

var inspect = require('eyes').inspector({ maxLength: 4096 });

var gcal = google.calendar('v3');
Promise.promisifyAll(gcal.acl);
Promise.promisifyAll(gcal.calendars);
Promise.promisifyAll(gcal.calendarList);
Promise.promisifyAll(gcal.events);

var CALENDAR_TITLE = 'storkboende';

module.exports = function (app) {
    app.get('/api/admin/get_bookings/:timeMin?/:timeMax?/:room?',
            // jwt({ secret: SERVER_SECRET }),
            function (req, res) {
                var timeMin = req.param('timeMin');
                var timeMax = req.param('timeMax');
                // console.log('timeMin: ' + timeMin);
                // console.log('timeMax: ' + timeMax);
                var room = req.param('room');

                var serviceAccountEmail = GOOGLE_SERVICE_ACCOUNT_EMAIL;
                var serviceAccountKeyFile = 'my-project-key.pem';

                var jwt = new google.auth.JWT(serviceAccountEmail,
                                              serviceAccountKeyFile, null,
                                              ['https://www.googleapis.com/auth/calendar']);

                jwt.authorize(function (err, result) {
                    if (err) {
                        console.log('Error: ' + err);
                        res.status(401).end();
                    } else {
                        gcal.calendarList.listAsync({ auth: jwt })
                            .then(function (calendars) {
                                var c = calendars[0].items.find(function (c) {
                                    return c.summary == CALENDAR_TITLE;
                                });

                                return gcal.events.listAsync({
                                    calendarId: c.id,
                                    timeMin: timeMin,
                                    timeMax: timeMax,
                                    auth: jwt
                                });
                            })
                            .then(function (events) {
                                var bookings = [];

                                events[0].items.forEach(function (e) {
                                    if (room && (!e.summary || !e.summary.match(new RegExp(room)))) {
                                        return; // wrong room, continue
                                    }

                                    var startDate;
                                    if (e.start.dateTime) {
                                        startDate = moment(e.start.dateTime);
                                    } else {
                                        startDate = moment(e.start.date);
                                    }

                                    var endDate;
                                    if (e.end.dateTime) {
                                        endDate = moment(e.start.dateTime);
                                    } else {
                                        endDate = moment(e.end.date);
                                    }

                                    bookings.push({
                                        name: e.summary,
                                        startDate: startDate.format('YYYY-MM-DD'),
                                        endDate: endDate.format('YYYY-MM-DD')
                                    });
                                });
                                // inspect(bookings)
                                // console.log('Room: ' + room);
                                // console.log('Booking count: ', bookings.length);
                                res.json(bookings);
                            });
                    }
                });
            });
};

}());

