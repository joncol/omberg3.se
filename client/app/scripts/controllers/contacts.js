"use strict";

/**
 * @ngdoc function
 * @name clientApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller for contact list
 */
angular.module('clientApp')
  .controller('ContactsCtrl', ["$scope", "Contacts", function ($scope, Contacts) {
      $scope.contacts = Contacts.query();
  }]);

