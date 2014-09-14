var bookingService = angular.module('BookingService', ['ngResource']);

bookingService.factory('BookingService', ['$resource', function ($resource) {
    return $resource('bokning/:year/:month', {}, {
        query: {
            method: 'GET',
            params: {
                year: '2014',
                month: '09',
            },
            isArray: true
        }
    });
}]);

