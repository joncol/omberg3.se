'use strict';

angular.module('clientApp')
    .controller('AdminMenuCtrl', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService', function ($scope, $http, $location, $window, UserService, AuthenticationService) {
        $('[data-tooltip="tooltip"]').tooltip('hide');
        $('[data-toggle="tooltip"]').tooltip('hide');

        $scope.isLoggedIn = function () {
            return AuthenticationService.isLoggedIn;
        }
    }]);

