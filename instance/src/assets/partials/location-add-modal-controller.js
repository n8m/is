/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('location-add-modal-controller', function($scope, server, $timeout, $location, $modalInstance){

    $scope.createLocation = createLocation;
    $scope.exit = exit;

    function createLocation(){

      var payload = {
        "action": "create",
        "instanceUrl": $location.host().split('.')[0],
        "locationName": $scope.location
      };

      server.post('/api/asset/location', payload).then(function(){
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
