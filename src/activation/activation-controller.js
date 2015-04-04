/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.activation')

.controller('activation-controller', function($scope, $stateParams, server){

    var token = $stateParams.token;

    if(token){
      server.get('/api/profile/activate/' + token).then(function(data){
        if(data.status === 200){
          $scope.validActivationLink = true;
        }
      }, function(response){
        if(response === 404){
          $scope.invalidActivationLink = true;
        }
      })

    } else{
      $state.go('base.main');
    }



});
