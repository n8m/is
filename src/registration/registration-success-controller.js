/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.registration')

.controller('registration-success-controller', function($scope, $stateParams, $state){

    if(!$stateParams.uniqueUrl){
      $state.go('base.registration');
      console.log('Error passing unique URL to registration-success page');
    } else{
      $scope.uniqueUrl = $stateParams.uniqueUrl;
    }

});
