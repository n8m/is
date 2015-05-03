/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('purchase-modal-controller', function($scope, $modalInstance, assetsService, userProfile, purchaseInfo){

    $scope.isPanelExpanded = isPanelExpanded;
    $scope.exit = exit;
    $scope.postPurchaseInfo = postPurchaseInfo;

    if(purchaseInfo){
      assetsService.queryPurchaseInfo(purchaseInfo).then(function(data){
        $scope.purchase = data.purchaseOrder;
        $scope.delivery = data.deliveryOrder;
      }, function(response){
        console.log(response);
      })
    }

    function postPurchaseInfo(){

      //if update
      if(purchaseInfo){
        var payload = {
          action: "update",
          instanceUrl: userProfile.getInstanceUrl(),
          purchaseOrder: $scope.purchase,
          deliveryOrder: $scope.delivery
        };

        assetsService.postPurchaseInfo(payload, purchaseInfo).then(function(data){
          $modalInstance.close(data);
        }, function(response){
          console.log(response);
        });
      } else{
        var payload = {
          action: "create",
          instanceUrl: userProfile.getInstanceUrl(),
          purchaseOrder: $scope.purchase,
          deliveryOrder: $scope.delivery
        };

        assetsService.postPurchaseInfo(payload).then(function(data){
          $modalInstance.close(data);
        }, function(response){
          console.log(response);
        });
      }
    }

    function isPanelExpanded(id){
      return ($scope.expandedPanels && $scope.expandedPanels.indexOf(id) !== -1);
    }

    function exit(){
      $modalInstance.close();
    }

  });
