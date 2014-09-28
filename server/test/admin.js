(function () {

'use strict';

process.env.OMBERG3_DB = 'omberg3_test';

var should = require('should');
var app = require('../app');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var User = require('../models/user');
var supertest = require('supertest');
var agent = supertest.agent(app);
var inspect = require('eyes').inspector({ maxLength: 16384 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

describe('Admin', function () {
    this.timeout(2000);

    var user;

    before(function (done) {
        user = new User({
            username: 'testuser',
            password: 'testpassword'
        });
        user.save(done);
    });

    after(function (done) {
        User.remove(done);
    });

    describe('Successful login', function () {
        it('should respond with token', function(done) {
            agent
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .end(function (err, res) {
                if (err) {
                    console.log('err: ' + err);
                } else {
                    // inspect(res.body, 'res.body');
                    res.body.token.should.not.be.empty;
                    res.body.token.length.should.be.greaterThan(128);
                }
                done();
            });
        });
    });
});

}());

