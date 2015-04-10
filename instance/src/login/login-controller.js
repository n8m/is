/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isfi.login')

.controller('login-controller', function($scope, server, auth, $state, $location){

    $scope.login = function(){

      var instanceName = $location.host().split('.')[0];

      $scope.payload = {
        grant_type: "password",
        username: instanceName + ":" + $scope.user.username,
        client_id:  instanceName,
        password: $scope.user.password
      };

      server.post('/oauth', $scope.payload).then(function(data){
        auth.setToken(data.data.access_token, data.data.refresh_token);
        $state.go('main.dashboard');

      }, function(response){
        console.log(response);
      })
    }

});
