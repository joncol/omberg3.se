"use strict";

angular.module("clientApp")
    .controller("BookingCtrl", ["$scope", "Booking", function ($scope, Booking) {
        $scope.bookings = Booking.query();
    }]);

