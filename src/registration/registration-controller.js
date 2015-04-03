/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.registration')

.controller('registration-controller', function($scope, countries, $state){
  $scope.countries = countries;

  $scope.user = {
    action: 'create'
  };

  $scope.proceed = function(){
    console.log($scope.user);
    $state.go('base.regSuccess')
  };




});
