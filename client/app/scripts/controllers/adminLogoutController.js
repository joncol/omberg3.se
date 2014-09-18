'use strict';

angular.module('clientApp')
    .controller('AdminLogoutCtrl', ['$scope', '$window', '$location', 'AuthenticationService', function ($scope, $window, $location, AuthenticationService) {
        if (AuthenticationService.isLoggedIn) {
            AuthenticationService.isLoggedIn = false;
            delete $window.sessionStorage.token;
        }
        // $scope.$apply(function () { $location.path('/'); });
        $location.path('/');
    }]);

