/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.profile')

  .controller('subscription-details-controller', function($scope, auth, server, $rootScope){

    var token = auth.getToken();

    if(token){
      server.get('/api/profile/login/' + token).then(function(data){

        server.get('/api/profile/cabinet/' + data.id).then(function(data){
          console.log(data);
          $scope.user = data;
        });

        $rootScope.loggedIn = true;
      })
    } else{
      $rootScope.loggedIn = false;
      //$state.go('base.main');
    }




  });
