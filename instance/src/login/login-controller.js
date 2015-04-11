/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isfi.login')

.controller('login-controller', function($scope, server, auth, $state, $location, $rootScope){

    $scope.login = function(){

      delete $scope.errorMessage;

      var instanceName = $location.host().split('.')[0];

      $scope.payload = {
        grant_type: "password",
        username: instanceName + ":" + $scope.user.username,
        client_id:  instanceName,
        password: $scope.user.password
      };

      server.post('/oauth', $scope.payload).then(function(data){
        auth.setToken(data.data.access_token, data.data.refresh_token);
        $rootScope.loggedIn = true;
        $state.go('base.main.dashboard');

      }, function(response){
        delete $scope.user.password;
        $scope.errorMessage = true;
        console.log(response);
      })
    }

});
