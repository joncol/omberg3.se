'use strict';

angular.module('clientApp')
    .controller('AdminApiCtrl', ['$scope', '$http', '$window',
                'UserService', 'AuthenticationService',
                function ($scope, $http, $window, UserService, AuthenticationService) {
                    $scope.migrateBookings = function () {
                        console.log('migrating bookings...');
                        $http.get('/api/admin/cp').success(function (data) {
                            console.log('migration successful');
                        }).error(function (data) {
                            console.log('migration failed');
                        });
                    };
                }]);

