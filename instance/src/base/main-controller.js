/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.main')

.controller('main-controller', function($scope, $state, userProfile, auth){

    $scope.userProfile = userProfile.getUserProfile();
    $scope.logout = auth.logout;

    //refactor!
    $scope.isCabinetView = function(){

      if($state.current.name.split('.')[2] && $state.current.name.split('.')[2] === 'cabinet'){
        return true;
      } else{
        return false;
      }
    };

});
