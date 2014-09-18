var userService = angular.module('UserService', []);

userService.factory('UserService', ['$http', function($http) {
    return {
        login: function(credentials) {
            return $http.post('/login', {
                username: credentials.username,
                password: credentials.password
            });
        },

        logOut: function() {
        }
    }
}]);

