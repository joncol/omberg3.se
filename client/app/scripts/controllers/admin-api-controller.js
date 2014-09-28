'use strict';

angular.module('clientApp')
    .controller('AdminApiCtrl', ['$scope', 'BookingService',
                function ($scope, BookingService) {
                    $scope.getBookings = function () {
                        $scope.bookings = BookingService.query();
                    };
                }]);

