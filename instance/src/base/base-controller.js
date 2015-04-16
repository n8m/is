/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.base')

.controller('base-controller', function($scope, userProfile){

    //this variable with dot-notation will be inherit in 'main-controller' which contains profilePanel
    $scope.profilePanel = {
      show: false
    };

    $scope.userProfile = function(){
      return userProfile.getUserProfile();
    }

});
