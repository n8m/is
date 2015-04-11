'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.registration')

.controller('registration-controller', function($scope, countries, $state, server){
  $scope.countries = countries;

  $scope.user = {
    action: 'create',
    dataContact: {}
  };

  $scope.proceed = function(){
    server.get('/api/validation/instance-ur',{instanceUrl: $scope.user.dataCredentials.instanceUrl}).then(function(){
      $scope.registerForm.$setValidity('url',true);
      $scope.isValidURL = true;
      registration();
    }, function(){
      $scope.registerForm.$setValidity('url',false);
      $scope.isValidURL = false;
    });
  };

  function registration(){
    server.post('/api/account/registration', $scope.user).then(function(){
      $state.go('base.regSuccess', {instanceUrl: $scope.user.dataCredentials.instanceUrl})
    }, function(response){

      if(response.status === 400){
        $scope.registrationErrors = response.data.errors;
      }
    });
  }

  (function(){
    server.get('/api/geolocation').then(
      function(data){
        $scope.user.dataContact.city = data.city;
        $scope.user.dataContact.country = data.country_name;
      }
    )
  })();

});
