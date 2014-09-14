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
            'ngTouch',
            'BookingService',
            'ContactsService',
            'AuthenticationService',
            'UserService'
            ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                pageTitle: 'Hem'
            })

            .when('/kontakt', {
                templateUrl: 'views/kontakt.html',
                controller: 'ContactsCtrl',
                pageTitle: 'Kontaktuppgifter'
            })

            .when('/:page', {
                message: 'yo fosHO!',
                templateUrl: function (params) {
                    return 'views/' + params.page + '.html'
                }
            })

            // .when('/about', {
            //   templateUrl: 'views/about.html',
            //   controller: 'AboutCtrl'
            // })

            .otherwise({
                redirectTo: '/'
            });

        // if (window.history && window.history.pushState) {
        //     $locationProvider.html5Mode(true);
        // }
    }]);
