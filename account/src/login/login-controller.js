/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.login')

.controller('login-controller', function($scope, server, auth, $state){

    $scope.payload = {
      grant_type: 'password'
    };

    $scope.login = function(){

      $scope.payload = {
        username: "my:" + $scope.user.username,
        client_id:  "my:" + $scope.user.username,
        password: $scope.user.password
      };

      server.post('/oauth', $scope.payload).then(function(data){
        auth.setToken(data.data.access_token, data.data.refresh_token);
        $state.go('main.panel');

      }, function(response){
        console.log(response);
      })
    }

});
