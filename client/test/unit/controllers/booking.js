"use strict";

describe("BookingCtrl", function () {

    beforeEach(module("clientApp"));

    var ctrl, scope, $httpBackend;

    var booking1 = { "name": "TestUser1" };
    var booking2 = { "name": "TestUser2" };
    var bookings = new Array(booking1, booking2);

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        ctrl = $controller("BookingCtrl", {
            $scope: scope
        });
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET("bokning/2014/09")
            .respond(bookings);
    }));

    it("should attach a bookings list to scope", function () {
        expect(scope.bookings).toBeDefined();
    });

    it("there should be two bookings", function () {
        $httpBackend.flush();
        expect(scope.bookings.length == 2);
    });
});
