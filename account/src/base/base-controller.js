/**
 * Created by fyodorkhruschov on 09.04.15.
 */
angular.module('isf.base')

.controller('base-controller', function($scope, auth, userProfile){

  $scope.logout = auth.logout;

  auth.checkToken().then(function(){
    $scope.userProfile = userProfile.getUserProfile();
  });

});
