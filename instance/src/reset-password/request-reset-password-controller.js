/**
 * Created by fyodorkhruschov on 10.04.15.
 */
angular.module('isfi.reset-password')

.controller('request-reset-password-controller', function($scope, server){
  $scope.requestPasswordReset = function(){

    delete $scope.successMessage;
    delete $scope.errorMessage;

    server.post('/api/profile/reset/password', {"action" : "create", "username" : 'my:' + $scope.username}).then(function(data){
      $scope.successMessage = true;
    }, function(response){
      $scope.errorMessage = true;
    })
  }
});
