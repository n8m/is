'use strict';

/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.activation')

.controller('activation-controller', function($scope, $stateParams, server, $state){

    var token = $stateParams.token;

    if(token){
      server.post('/api/account/activate', {activationKey: token}).then(function(data){

        if(data.data.status === 200){
          $scope.validActivationLink = true;
        }
      }, function(response){
        if(response.status === 404){
          $scope.invalidActivationLink = true;
        }
      });

    } else{
      $state.go('base.main');
    }
});
