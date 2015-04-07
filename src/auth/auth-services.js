/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.auth')

.factory('auth', function($http, $rootScope, ipCookie, server, $q){

  var _accessToken,
      _refreshToken;

  var authService = {
    setToken: function(accessToken, refreshToken){
      _accessToken = accessToken;
      _refreshToken = refreshToken;

      $rootScope.loggedIn = true;

      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

      ipCookie('isf_accessToken', accessToken);
      ipCookie('isf_refreshToken', refreshToken);
    },
    getToken: function(){
      if(_accessToken){
        return _accessToken;
      }
      var accessToken = ipCookie('isf_accessToken');

      if(accessToken){
        return accessToken;
      } else{
        return false;
      }

    },
    checkToken: function(){
      var accessToken = authService.getToken();

      if(!accessToken){
        var deffered = $q.defer();
        deffered.reject();
        return deffered.promise;
      }

      return server.get('/api/profile/login/' + accessToken);
    },
    refreshToken: function(){

      var refreshToken = _refreshToken || ipCookie('isf_refreshToken');
      if(refreshToken){
        //server.post('/oauth/' + refreshToken).then(function(){
        //  console.log(arguments);
        //}, function(){
        //  console.log(arguments);
        //})
      }
    }
  };

  return authService;

});
