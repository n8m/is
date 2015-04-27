/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('add-modal-controller', function($scope, server, $timeout, userProfile, $modalInstance, category, createUrl, name, itemPropertyName){

    $scope.create = create;
    $scope.exit = exit;
    $scope.name = name;


    function create(){

      var payload = {
        "action": "create",
        "instanceUrl": userProfile.getInstanceUrl()
      };

      payload[itemPropertyName] = $scope.item;

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
