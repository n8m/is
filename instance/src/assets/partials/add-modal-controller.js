/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('add-modal-controller', function($scope, server, $timeout, userProfile, $modalInstance, createUrl, name, itemPropertyName, asset){

    $scope.create = create;
    $scope.exit = exit;
    $scope.name = name;


    function create(){

      var payload = {
        "action": "create",
        "instanceUrl": userProfile.getInstanceUrl(),
        "category": asset.category.id
      };

      payload[itemPropertyName] = $scope.item;

      payload.company = asset.ownership.assignedCompany.id;

      server.post(createUrl, payload).then(function(){
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
