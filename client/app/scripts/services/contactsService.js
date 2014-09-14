var contactsService = angular.module("ContactsService", ["ngResource"]);

contactsService.factory("ContactsService", ["$resource", function ($resource) {
    return $resource("data/contacts.json", {}, {
        query: { method: "GET", isArray: true }
    });
}]);

