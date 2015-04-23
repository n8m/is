/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isfi.login')

.controller('login-controller', function($scope, server, auth, $state, userProfile){

    $scope.login = function(){

      delete $scope.errorMessage;

      var instanceName = userProfile.getInstanceUrl();

      $scope.payload = {
        grant_type: "password",
        username: instanceName + ":" + $scope.user.username,
        client_id:  instanceName,
        password: $scope.user.password
      };

      server.post('/oauth', $scope.payload).then(function(data){
        auth.setToken(data.data.access_token, data.data.refresh_token);
        $state.go('base.main.dashboard');

      }, function(response){
        delete $scope.user.password;
        $scope.errorMessage = true;
      })
    }

});
