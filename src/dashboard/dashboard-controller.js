/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.dashboard')

.controller('dashboard-controller', function($scope, server){
  server.get('/api/profile/login/').then(function(data){
    console.log(data);
  })
});
