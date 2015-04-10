/**
 * Created by fyodorkhruschov on 10.04.15.
 */
angular.module('isf.reset-password')

  .controller('reset-password-controller', function($stateParams){
    console.log($stateParams.token);
  });
