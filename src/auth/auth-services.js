/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.auth')

.factory('auth', function($http){
  var authService = {
    setToken: function(token){
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
  };

  return authService;

});
