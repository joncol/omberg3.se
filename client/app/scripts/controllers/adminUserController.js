'use strict';

angular.module('clientApp')
    .controller('AdminUserCtrl', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService', function ($scope, $http, $location, $window, UserService, AuthenticationService) {
        $scope.login = function (credentials) {
            UserService.login(credentials).
                success(function (data) {
                    AuthenticationService.isLoggedIn = true;
                    $window.sessionStorage.token = data.token;
                    console.log('token: ' + data.token);
                    $location.path('/admin');
                }).
                error(function (data) {
                    console.log('AdminUserCtrl: Login error');
                    $scope.message = data.message;
                });
        };

        $scope.logout = function () {
            if (AuthenticationService.isLoggedIn) {
                AuthenticationService.isLoggedIn = false;
                delete $window.sessionStorage.token;
            }
        };

        $scope.isLoggedIn = function () {
            return AuthenticationService.isLoggedIn;
        }
    }]);

