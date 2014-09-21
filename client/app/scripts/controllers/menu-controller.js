'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the menu. Highlights the currently active menu item.
 */
angular.module('clientApp')
    .controller('MenuCtrl', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.isLoggedIn = function () {
            return AuthenticationService.isLoggedIn;
        }
    }]);
