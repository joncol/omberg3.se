'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$scope', '$route', '$routeParams', function ($scope, $route, $routeParams) {
      $scope.$on('$routeChangeSuccess', function (event, current, previous) {
          if ($route.current) {
              $scope.pageTitle = $route.current.pageTitle ||
                  capitalizeFirstLetter($routeParams.page);
          }
      });
  }]);

function capitalizeFirstLetter(string)
{
    if (!string || string === "") {
        return "";
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

