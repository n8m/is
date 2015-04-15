/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.base')

.controller('base-controller', function($scope, auth, $rootScope, $state){

    //this variable with dot-notation will be inherit in 'main-controller' which contains profilePanel
    $scope.profilePanel = {
      show: false
    };

    $scope.logout = auth.logout;

    auth.checkToken().then(function(){
      $rootScope.loggedIn = true;
      $state.go('base.main.dashboard');
      //$scope.userProfile = userProfile.getUserProfile();
    });

});
