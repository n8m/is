/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('lease-modal-controller', function($scope, $modalInstance, assetsService, userProfile){

    $scope.isPanelExpanded = isPanelExpanded;
    $scope.exit = exit;
    $scope.postLeaseInfo = postLeaseInfo;


    function postLeaseInfo(){

      var payload = {
        action: "create",
        instanceUrl: userProfile.getInstanceUrl(),
        leaseAgreement: $scope.agreement,
        deliveryOrder: {
          "orderNumber": "",
          "orderDate": "",
          "actualDateReceived": ""
        }
      };

      assetsService.postLeaseInfo(payload);

    }

    function isPanelExpanded(id){
      return ($scope.expandedPanels && $scope.expandedPanels.indexOf(id) !== -1);
    }

    function exit(){
      $modalInstance.close();
    }

  });
