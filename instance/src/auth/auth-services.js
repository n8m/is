/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isfi.auth')

.factory('auth', function($http, ipCookie, server, $q, $state, userProfile){

  var _accessToken,
      _refreshToken;

  var authService = {
    setToken: function(accessToken, refreshToken){
      _accessToken = accessToken;

      if(refreshToken){
        _refreshToken = refreshToken;
        ipCookie('isfi_refreshToken', refreshToken);
      }

      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      ipCookie('isfi_accessToken', accessToken);
    },
    getToken: function(){
      if(_accessToken){
        return _accessToken;
      }
      var accessToken = ipCookie('isfi_accessToken');

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

      authService.setToken(accessToken);

      return server.get('/api/profile/login/' + accessToken);
    },
    refreshToken: function(){

      var deffered = $q.defer();

      var refreshToken = _refreshToken || ipCookie('isfi_refreshToken');
      if(refreshToken){

        var payload = {
          "grant_type": "refresh_token",
          "refresh_token": refreshToken,
          "client_id": "testclient2",
          "client_secret": null
        };

        server.post('/oauth', payload).then(function(data){
          authService.setToken(data.data.access_token);
          deffered.resolve();
        }, function(){
          deffered.reject();
        })
      } else{
        deffered.reject();
      }

      return deffered.promise;

    },
    logout: function(){

      var accessToken = authService.getToken();

      if(accessToken){
        server.post('/api/profile/logout/' + accessToken).then(function(){
          cleanToken();
        }, function(response){
          cleanToken();
        })
      }else{
        cleanToken();
      }

      function cleanToken(){
        _refreshToken = false;
        _accessToken = false;
        ipCookie.remove('isf_refreshToken');
        ipCookie.remove('isf_accessToken');
        userProfile.cleanUserProfile();
        delete $http.defaults.headers.common.Authorization;
        $state.go('base.home');
      }

    }
  };

  return authService;

});
