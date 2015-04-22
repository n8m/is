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
    $scope.submited = true;
    server.post('/api/account/registration', $scope.user).then(function(){
      $state.go('base.regSuccess', {instanceUrl: $scope.user.dataCredentials.instanceUrl})
    }, function(response){
      if(response.status === 400){
        response.data.errors.forEach(function(el) {
          $scope.registerForm[el.field].$setValidity('username', false);
        });
      }
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
