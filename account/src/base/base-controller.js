/**
 * Created by fyodorkhruschov on 09.04.15.
 */
angular.module('isf.base')

.controller('base-controller', function($scope, auth){

  $scope.logout = auth.logout;

});
