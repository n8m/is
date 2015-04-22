/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('purchase-modal-controller', function($scope, $modalInstance){

    $scope.isPanelExpanded = isPanelExpanded;
    $scope.exit = exit;



    function isPanelExpanded(id){
      return ($scope.expandedPanels && $scope.expandedPanels.indexOf(id) !== -1);
    }

    function exit(){
      $modalInstance.close();
    }

  });
