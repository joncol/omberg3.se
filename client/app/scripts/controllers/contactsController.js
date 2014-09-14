"use strict";

angular.module("clientApp")
    .controller("ContactsCtrl", ["$scope", "ContactsService", function ($scope, contactsService) {
        $scope.contacts = contactsService.query();
    }]);

