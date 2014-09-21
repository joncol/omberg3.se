'use strict';

angular.module('clientApp')
    .controller('AdminLogoutCtrl', ['$scope', '$window', '$location', 'AuthenticationService', function ($scope, $window, $location, AuthenticationService) {
        AuthenticationService.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }]);

