"use strict";

angular.module("clientApp")
    .controller("ContactsCtrl", ["$scope", "contactsService", function ($scope, contactsService) {
        $scope.contacts = contactsService.query();
    }]);

