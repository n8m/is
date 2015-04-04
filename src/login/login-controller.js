/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.login')

.controller('login-controller', function($scope, server, auth, $window){

    $scope.user = {
      grant_type: 'password',
      client_id: 'testclient2'
    };

    $scope.login = function(){


      server.post('/oauth', $scope.user).then(function(data){
        auth.setToken(data.data.access_token);

        server.get('/api/profile/login/' + data.data.access_token).then(function(data){
          $window.location.href = 'http://' + data.dataCredentials.uniqueUrl + '.isitupdotcom.com/#/dashboard';
        });

        //go to subdomain
      }, function(response){
        console.log(response);
      })
    }

});
