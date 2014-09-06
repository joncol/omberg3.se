var contactsService = angular.module("contactsService", ["ngResource"]);

contactsService.factory("contactsService", ["$resource", function ($resource) {
    return $resource("data/contacts.json", {}, {
        query: { method: "GET", isArray: true }
    });
}]);

