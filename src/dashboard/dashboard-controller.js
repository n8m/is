/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.dashboard')

.controller('dashboard-controller', function($scope, server, auth, $rootScope){

  var token = auth.getToken();

  if(token){
    server.get('/api/profile/login/' + token).then(function(data){
      $rootScope.loggedIn = true;
      console.log(data);
    })
  } else{
    $rootScope.loggedIn = false;
  }


});
