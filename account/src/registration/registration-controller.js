'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.registration')

.controller('registration-controller', function($scope, countries, $state, server){
  $scope.countries = countries;

  var errorCountGeo = 0;

  $scope.f = function(){
    $scope.foc = true;
  }

  $scope.user = {
    action: 'create',
    dataContact: {},
    dataCredentials: {}
  };

  $scope.proceed = function(){
    server.post('/api/account/registration', $scope.user).then(function(){
      $state.go('base.regSuccess', {instanceUrl: $scope.user.dataCredentials.instanceUrl})
    }, function(response){
      if(response.status === 400){
        $scope.registrationErrors = response.data.errors;
      }
    });
  };

  $scope.checkInstance = function(){
    server.get('/api/validation/instance-url',{instanceUrl: $scope.user.dataCredentials.instanceUrl}).then(function(){
      $scope.registerForm.$setValidity('url',true);
      $scope.isValidURL = true;
      $scope.foc = false;
    }, function(){
      $scope.registerForm.$setValidity('url',false);
      $scope.isValidURL = false;
      $scope.foc = false;
    });
  };

  function geo(){
    server.get('/api/geolocation').then(
      function(data){
        $scope.user.dataContact.city = data.city;
        $scope.user.dataContact.country = data.country_name;
        $scope.user.dataContact.state = data.region_name;
        $scope.user.dataContact.zip = data.zipcode || data.zip_code;
      }
    , function(){
        if(errorCountGeo < 3){
          errorCountGeo = errorCountGeo + 1; //специально не инткремент
          geo();
        }
      })
  };

  geo();

});
