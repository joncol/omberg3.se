'use strict';

angular.module('clientApp')
    .controller('AdminMenuCtrl', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService', function ($scope, $http, $location, $window, UserService, AuthenticationService) {
        $('[data-tooltip="tooltip"]').tooltip('hide');
        $('[data-toggle="tooltip"]').tooltip('hide');
        // if ($window.sessionStorage.token) {
        //     console.log('disabling login link');
        //     $('[href="#/login"').removeAttr('href');
        // } else {
        //     console.log('disabling logout link');
        //     $('[href="#/logout"').removeAttr('href');
        // }

        $scope.isLoggedIn = function () {
            return AuthenticationService.isLoggedIn;
        }
    }]);

