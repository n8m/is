/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('lease-modal-controller', function($scope, $modalInstance, assetsService, userProfile, leaseInfo){

    $scope.isPanelExpanded = isPanelExpanded;
    $scope.exit = exit;
    $scope.postLeaseInfo = postLeaseInfo;

    if(leaseInfo){
      assetsService.queryLeaseInfo(leaseInfo).then(function(data){
        $scope.agreement = data.leaseAgreement;
        $scope.delivery = data.deliveryOrder;
      }, function(response){
        console.log(response);
      })
    }


    function postLeaseInfo(){

      //if update
      if(leaseInfo){

        var payload = {
          action: "update",
          instanceUrl: userProfile.getInstanceUrl(),
          leaseAgreement: $scope.agreement,
          deliveryOrder: $scope.delivery
        };

        assetsService.postLeaseInfo(payload, leaseInfo).then(function(data){
          $modalInstance.close(data);
        }, function(response){
          console.log(response);
        });

      } else{//if create
        var payload = {
          action: "create",
          instanceUrl: userProfile.getInstanceUrl(),
          leaseAgreement: $scope.agreement,
          deliveryOrder: $scope.delivery
        };

        assetsService.postLeaseInfo(payload).then(function(data){
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
