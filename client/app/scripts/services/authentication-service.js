var authenticationService = angular.module('AuthenticationService', ['ngResource']);

authenticationService.factory('AuthenticationService', function () {
    var auth = {
        isLoggedIn: false
    };

    return auth;
});
