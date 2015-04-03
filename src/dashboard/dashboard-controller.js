/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.dashboard')

.controller('dashboard-controller', function($scope, server, auth){

  server.get('/api/profile/login/' + auth.getToken()).then(function(data){
    console.log(data);
  })
});
