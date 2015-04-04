/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.activation')

.controller('activation-controller', function($scope, $state, $stateParams, server){

    var token = $stateParams.token;

    if(token){
      server.get('/api/profile/activate/' + token).then(function(data){
        if(data.status === 200){
          $state.go('base.login');
        }
      }, function(response){
        if(response.state === 404){
          $scope.invalidLink = true;
        }
      })

    } else{
      $state.go('base.main');
    }



});
