'use strict';

angular.module('clientApp')
    .controller('AdminUserCtrl', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService', function ($scope, $http, $location, $window, UserService, AuthenticationService) {
        $scope.message = 'yo bro';

        $scope.login = function (credentials) {
            UserService.login(credentials).success(function(data) {
                    console.log('login success');
                    AuthenticationService.isLoggedIn = true;
                    $window.sessionStorage.token = data.token;
                    $location.path('/admin');
                }).

                error(function(status, data) {
                    console.log('login error');
                });

            // $http({
            //     method: 'POST',
            //     url: '/login',
            //     username: credentials.username,
            //     password: credentials.password,
            // }).
            //     success(function(data, status, headers, config) {
            //         console.log('login success');
            //     }).
            //
            //     error(function(data, status, headers, config) {
            //         console.log('login error');
            //     });
        };

        $scope.logout = function () {
            if (AuthenticationService.isLoggedIn) {
                AuthenticationService.isLoggedIn = false;
                delete $window.sessionStorage.token;
            }
        };
    }]);

