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
            'AuthInterceptor',
            'UserService'
            ])
    .config(['$routeProvider', function ($routeProvider) {
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

            .when('/admin', {
                access: { requiresLogin: true },
                templateUrl: 'views/admin.html',
                pageTitle: 'Admin'
            })

            .when('/:page', {
                templateUrl: function (params) {
                    return 'views/' + params.page + '.html';
                }
            })

            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$location', '$window', 'AuthenticationService', function ($rootScope, $location, $window, AuthenticationService) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if (nextRoute.access && nextRoute.access.requiresLogin &&
                !AuthenticationService.isLoggedIn &&
                !$window.sessionStorage.token) {
                console.log('Auth failed. Redirecting to login page');
                $location.path('/login');
            } else if (!AuthenticationService.isLoggedIn &&
                       $window.sessionStorage.token) {
                AuthenticationService.isLoggedIn = true;
            }
        });
    }]);

