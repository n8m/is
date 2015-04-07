/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.auth')

.factory('auth', function($http, $rootScope, ipCookie){

    var _accessToken,
        _refreshToken;

  var authService = {
    setToken: function(accessToken, refreshToken){
      _accessToken = accessToken;
      _refreshToken = refreshToken;

      $rootScope.loggedIn = true;

      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

      ipCookie('ipf_accessToken', accessToken);
      ipCookie('ipf_refreshToken', refreshToken);
    },
    getToken: function(){
      if(_accessToken){
        return _accessToken;
      } else{
        return false;
      }
    }
  };

  return authService;

});
