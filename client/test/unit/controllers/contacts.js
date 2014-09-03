"use strict";

describe("ContactsCtrl", function () {

    // load the controller's module
    beforeEach(module("clientApp"));

    var ctrl, scope, $httpBackend;

    var contact1 = { "name": "TestUser1" };
    var contact2 = { "name": "TestUser2" };
    var contacts = new Array(contact1, contact2);

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        ctrl = $controller("ContactsCtrl", {
            $scope: scope
        });
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET("data/contacts.json")
            .respond(contacts);
    }));

    it("should attach a contact list to scope", function () {
        expect(scope.contacts).toBeDefined();
    });

    describe("contacts list", function () {
        it("should have two elements", function () {
            $httpBackend.flush();
            expect(scope.contacts.length == 2);
        });
    });
});
