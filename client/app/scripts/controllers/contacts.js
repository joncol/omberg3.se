"use strict";

angular.module("clientApp")
    .controller("ContactsCtrl", ["$scope", "Contacts", function ($scope, Contacts) {
        $scope.contacts = Contacts.query();
    }]);

