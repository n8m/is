/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.main')

.controller('main-controller', function($scope, $state, userProfile, auth, assetsService, server){

    $scope.userProfile = userProfile.getUserProfile();
    $scope.logout = auth.logout;

    server.get('/api/asset/category', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
      $scope.categories = data._embedded.items;
    });


    //refactor!
    $scope.isCabinetView = function(){

      if($state.current.name.split('.')[2] && $state.current.name.split('.')[2] === 'cabinet'){
        return true;
      } else{
        return false;
      }
    };

});
