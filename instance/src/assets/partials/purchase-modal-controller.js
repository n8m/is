/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('purchase-modal-controller', function($scope, $modalInstance, assetsService, userProfile){

    $scope.isPanelExpanded = isPanelExpanded;
    $scope.exit = exit;
    $scope.postPurchaseInfo = postPurchaseInfo;



    function postPurchaseInfo(){

      var payload = {
        action: "create",
        instanceUrl: userProfile.getInstanceUrl(),
        purchaseOrder: $scope.purchase,
        deliveryOrder: $scope.delivery
      };

      assetsService.postPurchaseInfo(payload);

    }

    function isPanelExpanded(id){
      return ($scope.expandedPanels && $scope.expandedPanels.indexOf(id) !== -1);
    }

    function exit(){
      $modalInstance.close();
    }

  });
