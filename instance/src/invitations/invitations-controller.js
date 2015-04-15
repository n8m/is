/**
 * Created by fyodorkhruschov on 15.04.15.
 */
angular.module('isfi.invitations')

.controller('invitations-controller', function($stateParams, server, $scope){
  server.get('/api/instance/user/invite/' + $stateParams.token).then(function(){
    $scope.success = true;
  }, function(){
    $scope.error = true;
  });

  $scope.setNewPassword = function(){

    delete $scope.successMessage;
    delete $scope.errorMessage;

    var payload = {
      "action" : "update",
      "key": $stateParams.token,
      "password" : $scope.password,
      "passwordRepeat" : $scope.passwordRepeat
    };

    server.post('/api/instance/user/invite/' + $stateParams.token, payload).then(function(){
      $scope.successMessage = true;
    }, function(){
      $scope.errorMessage = true;
    })
  }

});

