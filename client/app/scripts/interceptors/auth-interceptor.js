'use strict';

var authInterceptor = angular.module('AuthInterceptor', []);

authInterceptor.factory('AuthInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                console.log('Not authenticated');
            }
            return response || $q.when(response);
        }
    };
});

authInterceptor.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

