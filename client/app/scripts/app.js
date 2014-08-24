'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html"
      })
      .when("/kontakt", {
        templateUrl: "views/kontakt.html",
        controller: "ContactsCtrl"
      })
      .when("/:page", {
        templateUrl: function (params) {
            return "views/" + params.page + ".html"
        }
      })
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
      .otherwise({
        redirectTo: "/"
      });
  });
