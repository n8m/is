/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.panel')

.controller('panel-controller', function($scope, server, auth, $rootScope, $state){

  var token = auth.getToken();

  if(token){
    server.get('/api/profile/login/' + token).then(function(data){
      $rootScope.loggedIn = true;
    })
  } else{
    $rootScope.loggedIn = false;
    $state.go('base.main');
  }


});
