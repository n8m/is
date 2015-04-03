/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.login')

.controller('login-controller', function($scope, server){

    $scope.user = {
      grant_type: 'password',
      client_id: 'testclient2'
    };

    $scope.login = function(){
      server.post('/oauth', $scope.user);
    }

});
