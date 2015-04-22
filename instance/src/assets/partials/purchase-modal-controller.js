/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('purchase-modal-controller', function($scope){

    $scope.isPanelExpanded = isPanelExpanded;

    function isPanelExpanded(id){
      return ($scope.expandedPanels.indexOf(id) !== -1);
    }

  });
