'use strict';

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

      if(refreshToken){
        _refreshToken = refreshToken;
        ipCookie('isf_refreshToken', refreshToken);
      }

      $rootScope.loggedIn = true;
      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      ipCookie('isf_accessToken', accessToken);
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

      var deffered = $q.defer();

      var refreshToken = _refreshToken || ipCookie('isf_refreshToken');
      if(refreshToken){

        var payload = {
          'grant_type': 'refresh_token',
          'refresh_token': refreshToken,
          'client_id': 'testclient2',
          'client_secret': null
        };

        server.post('/oauth', payload).then(function(data){
          authService.setToken(data.data.access_token);
          deffered.resolve();
        }, function(){
          deffered.reject();
        });
      } else{
        deffered.reject();
      }

      return deffered.promise;
    }
  };

  return authService;

});
