/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.profile')

.controller('profile-settings-controller', function($scope, auth, server, $rootScope){

    var token = auth.getToken();

    if(token){
      server.get('/api/profile/login/' + token).then(function(data){
        $rootScope.loggedIn = true;

        server.get('/api/profile/cabinet/' + data.id).then(function(data){
          console.log(data);
          $scope.user = data;
        });

      })
    } else{
      $rootScope.loggedIn = false;
      //$state.go('base.main');
    }

});
