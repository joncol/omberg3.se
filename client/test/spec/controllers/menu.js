"use strict";

describe("Controller: MenuCtrl", function () {

    // load the controller's module
    beforeEach(module("clientApp"));

    var ctrl, scope, location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location) {
        scope = $rootScope.$new();
        ctrl = $controller("MenuCtrl", {
            $scope: scope
        });
        location = $location
    }));

    it("should attach a function isActive to scope", function () {
        expect(typeof scope.isActive).toBe("function");
    });

    it("isActive should return true for current page", function () {
        location.path("/information.html");
        expect(scope.isActive("/information.html")).toBe(true);
    });

    it("isActive should return false for other page than current", function () {
        location.path("/main.html");
        expect(scope.isActive("/information.html")).toBe(false);
    });
});
