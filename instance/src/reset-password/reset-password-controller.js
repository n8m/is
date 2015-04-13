/**
 * Created by fyodorkhruschov on 10.04.15.
 */
angular.module('isfi.reset-password')

.controller('reset-password-controller', function($scope, $stateParams, server){
    $scope.setNewPassword = function(){

      delete $scope.successMessage;
      delete $scope.errorMessage;

      var payload =  {
        "action" : "update",
        "key" : $stateParams.token,
        "password" : $scope.password,
        "passwordRepeat": $scope.passwordRepeat
      };

      server.post('/api/profile/reset/password/' + $stateParams.token, payload).then(function(data){
        $scope.successMessage = true;
        console.log(data);
      }, function(response){
        $scope.errorMessage = true;
        console.log(response)
      });
    }
});
