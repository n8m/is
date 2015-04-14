/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.base')

.controller('header-controller', function($scope, auth, $rootScope){
    $scope.logout = auth.logout;

    auth.checkToken().then(function(){
      $rootScope.loggedIn = true;
      //$scope.userProfile = userProfile.getUserProfile();
    });

});
