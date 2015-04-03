/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.auth')

.factory('auth', function($http, $rootScope){

    var accessToken;

  var authService = {
    setToken: function(token){
      console.log(token);
      accessToken = token;
      $rootScope.loggedIn = true;
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    },
    getToken: function(){
      return accessToken;
    }
  };

  return authService;

});
