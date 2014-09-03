var bookingService = angular.module("bookingService", ["ngResource"]);

bookingService.factory("Booking", ["$resource", function ($resource) {
    return $resource("bookings/:year/:month", {}, {
        query: {
            method: "GET",
            params: {
                year: "2014",
                month: "09",
            },
            isArray: true
        }
    });
}]);

