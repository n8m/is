/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('status-add-modal-controller', function($scope, server, $timeout, userProfile, $modalInstance){

    $scope.createStatus = createStatus;
    $scope.exit = exit;

    function createStatus(){

      var payload = {
        "action": "create",
        "instanceUrl": userProfile.getInstanceUrl(),
        "statusName": $scope.status
      };

      server.post('/api/asset/status', payload).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
          exit();
        }, 3000);

      })
    }

    function exit(){
      $modalInstance.close();
    }


  });
