'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the menu. Highlights the currently active menu item.
 */
angular.module('clientApp')
  .controller('MenuCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          // return $location.path().indexOf(viewLocation) == 0;
          return viewLocation === $location.path();
      };
  });
