/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.login')

.controller('login-controller', function($scope, server, auth){

    $scope.user = {
      grant_type: 'password',
      client_id: 'testclient2'
    };

    $scope.login = function(){
      server.post('/oauth', $scope.user).then(function(data){
        console.log(data);
      }, function(response){
        console.log(response);
      })
    }

});
