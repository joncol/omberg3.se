var authFunc = require('./authFunc');

module.exports = function (app, passport) {
    app.post('/login', authFunc);
}

