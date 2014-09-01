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
    .module("clientApp", [
            "ngAnimate",
            "ngCookies",
            "ngResource",
            "ngRoute",
            "ngSanitize",
            "ngTouch",
            "contactServices"
            ])
    .config(function ($routeProvider) {
        $routeProvider

        .when("/", {
            templateUrl: "views/main.html",
            pageTitle: "Hem"
        })

        .when("/kontakt", {
            templateUrl: "views/kontakt.html",
            controller: "ContactsCtrl",
            pageTitle: "Kontaktuppgifter"
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
