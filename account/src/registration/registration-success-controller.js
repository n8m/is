'use strict';

/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.registration')

.controller('registration-success-controller', function($scope, $stateParams, $state){

    if(!$stateParams.instanceUrl){
      $state.go('base.registration');
      console.log('Error passing unique URL to registration-success page');
    } else{
      $scope.instanceUrl = $stateParams.instanceUrl;
    }

});
