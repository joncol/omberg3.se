var bookingService = angular.module('BookingService', ['ngResource']);

bookingService.factory('BookingService', ['$resource', function ($resource) {
    return $resource('/api/admin/get_bookings/:timeMin/:timeMax/:room');
}]);

