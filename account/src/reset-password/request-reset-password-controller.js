/**
 * Created by fyodorkhruschov on 10.04.15.
 */
angular.module('isf.reset-password')

.controller('request-reset-password-controller', function($scope, server){
  $scope.requestPasswordReset = function(){

    delete $scope.successMessage;
    delete $scope.errorMessage;

    console.log('here');

    server.post('/api/profile/reset/password', {"action" : "create", "username" : 'my' + $scope.username}).then(function(data){
      $scope.successMessage = true;
    }, function(response){
      $scope.errorMessage = true;
    })
  }
});
