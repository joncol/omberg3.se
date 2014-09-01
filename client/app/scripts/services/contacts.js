var contactServices = angular.module("contactServices", ["ngResource"]);

contactServices.factory("Contacts", ["$resource", function ($resource) {
    return $resource("data/contacts.json", {}, {
        query: { method: "GET", isArray: true }
    });
}]);
