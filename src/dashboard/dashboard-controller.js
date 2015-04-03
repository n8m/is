/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.dashboard')

.controller('dashboard-controller', function($scope, server, auth){

  var token = auth.getToken();

  if(token){
    server.get('/api/profile/login/asdfljasdlfkj').then(function(data){
      console.log(data);
    })
  }


});
