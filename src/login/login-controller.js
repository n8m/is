/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.login')

.controller('login-controller', function($scope, server, auth, $state){

    $scope.user = {
      grant_type: 'password',
      client_id: 'testclient2'
    };

    $scope.login = function(){

      server.post('/oauth', $scope.user).then(function(data){
        console.log(data);
        auth.setToken(data.data.access_token, data.data.refresh_token);

        server.get('/api/profile/login/' + data.data.access_token).then(function(data){
          $state.go('main.panel');
        });

      }, function(response){
        console.log(response);
      })
    }

});
