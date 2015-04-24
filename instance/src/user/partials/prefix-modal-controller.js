/**
 * Created by fyodorkhruschov on 23.04.15.
 */
angular.module('isfi.user')

.controller('prefix-modal-controller', function($scope, $modalInstance, server, userProfile, $timeout){

    $scope.exit = exit;
    $scope.setPrefix = setPrefix;

    function exit(){
      $modalInstance.close();
    }

    function setPrefix(){

      var payload = {
        "action": "update",
        "assetIdPrefix": $scope.prefix
      };

      server.post('/api/instance/' + userProfile.getInstanceUrl(), payload).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
          exit();
        }, 3000)

      }, function(){
        $scope.errorMessage = true;
      })
    }

});
