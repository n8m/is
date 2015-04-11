/**
 * Created by fyodorkhruschov on 10.04.15.
 */
angular.module('isfi.reset-password')

.controller('request-reset-password-controller', function($scope, server, $location){
  $scope.requestPasswordReset = function(){

    //Todo: change with entity userProfile
    var instanceUrl = $location.host().split('.')[0];

    delete $scope.successMessage;
    delete $scope.errorMessage;

    server.post('/api/profile/reset/password', {"action" : "create", "username" : instanceUrl + ':' + $scope.username}).then(function(data){
      $scope.successMessage = true;
    }, function(response){
      $scope.errorMessage = true;
    })
  }
});
