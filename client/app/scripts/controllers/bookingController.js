"use strict";

angular.module("clientApp")
    .controller("BookingCtrl", ["$scope", "BookingService", function ($scope, BookingService) {
        $scope.bookings = BookingService.query();
    }]);

