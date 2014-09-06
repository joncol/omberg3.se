"use strict";

angular.module("clientApp")
    .controller("BookingCtrl", ["$scope", "bookingService", function ($scope, bookingService) {
        $scope.bookings = bookingService.query();
    }]);

