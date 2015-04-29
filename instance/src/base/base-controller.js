/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.base')

.controller('base-controller', function($scope, userProfile, auth){

    //@todo: perfect case - move this check into 'resolve' ui-router
    auth.checkInstance().then(function(){
      //instance exist
    }, function(){

      //instance is not exist - show error
      $scope.showNotExist = true;
      return;

    });

    //this variable with dot-notation will be inherit in 'main-controller' which contains profilePanel
    $scope.profilePanel = {
      show: false
    };

    $scope.userProfile = function(){
      return userProfile.getUserProfile();
    }

});
