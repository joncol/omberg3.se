'use strict';

angular.module('clientApp')
    .controller('AdminApiCtrl', ['$scope', '$http', '$window', '$filter',
                'UserService', 'AuthenticationService',
                function ($scope, $http, $window, $filter, UserService, AuthenticationService) {
                    $scope.migrateBookings = function () {
                        console.log('migrating bookings...');
                        $http.get('/api/admin/cp').success(function (data) {
                            console.log('migration successful');
                            console.log('data: ' + $filter('json')(data));
                        }).error(function (data) {
                            console.log('migration failed');
                        });
                    };
                }]);

