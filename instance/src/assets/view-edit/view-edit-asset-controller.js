/**
 * Created by fyodorkhruschov on 29.04.15.
 */
angular.module('isfi.assets')

.controller('view-edit-asset-controller', function($scope, $stateParams, assetsService){

    assetsService.queryAsset($stateParams.assetId).then(function(data){
      $scope.asset = data;
    }, function(response){
      console.log(response);
    })
});
