/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.registration')

.controller('registration-controller', function($scope, countries, $state, server){
  $scope.countries = countries;

  $scope.user = {
    action: 'create'
  };

  $scope.proceed = function(){
    server.post('profile/registration', $scope.user).then(function(){
      $state.go('base.regSuccess')
    }, function(response){
      console.log(response);
    })
  };




});
