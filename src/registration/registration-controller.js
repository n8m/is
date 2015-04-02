/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.registration')

.controller('registration-controller', function($scope, countries, $state){
  $scope.countries = countries;

  $scope.proceed = function(){
    $state.go('base.regSuccess')
  };

});
