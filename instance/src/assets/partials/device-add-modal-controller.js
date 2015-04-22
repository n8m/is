/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('device-add-modal-controller', function($scope, server, $timeout, $location, $modalInstance, category){

    $scope.createDeviceType = createDeviceType;
    $scope.exit = exit;
    $scope.deviceType = {};


    function createDeviceType(){

      var payload = {
        "action": "create",
        "instanceUrl": $location.host().split('.')[0],
        "assetCategory": category,
        "deviceTypeName": $scope.deviceType.name
      };

      server.post('/api/asset/devicetype', payload).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
        }, 3000);

      })
    }

    function exit(){
      $modalInstance.close();
    }


  });
