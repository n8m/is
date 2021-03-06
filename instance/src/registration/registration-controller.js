/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.registration')

.controller('registration-controller', function($scope, countries, $state, server){
  $scope.countries = countries;

  $scope.user = {
    action: 'create'
  };

  $scope.proceed = function(){
    server.post('/api/profile/registration', $scope.user).then(function(){
      $state.go('base.regSuccess', {uniqueUrl: $scope.user.dataCredentials.uniqueUrl})
    }, function(response){

      if(response.status === 400){
        $scope.registrationErrors = response.data.errors;
      }
    })
  };




});
