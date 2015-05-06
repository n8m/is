/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('assets-list-controller', function($scope, $stateParams, server, userProfile){

  $scope.categoryKey = $stateParams.categoryKey;
  $scope.assetCheckedCallback = assetCheckedCallback;
  $scope.changeAllCheckboxes = changeAllCheckboxes;
  $scope.countSelectedAssets = countSelectedAssets;
  $scope.getIdSelectedAsset = getIdSelectedAsset;
  $scope.selectedAssets = {};

  server.get('/api/asset',
    {
      instanceUrl: userProfile.getInstanceUrl(),
      category: $stateParams.categoryKey
    }
  ).then(function(data){
    $scope.assets = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  function assetCheckedCallback(asset){

    if(asset.selected){
      $scope.selectedAssets[asset.id] = asset;
    } else{
      delete $scope.selectedAssets[asset.id];
    }

  }

  function changeAllCheckboxes(){

    var i, len;

    if($scope.commonCheckbox){
      for(i = 0, len = $scope.assets.length; i<len; i++){
        $scope.assets[i].selected = true;
        assetCheckedCallback($scope.assets[i]);
      }
    }else{
      for(i = 0, len = $scope.assets.length; i<len; i++){
        delete $scope.assets[i].selected;
        assetCheckedCallback($scope.assets[i]);
      }
    }
  }

  function countSelectedAssets(){
    return Object.keys($scope.selectedAssets).length;
  }

  function getIdSelectedAsset(){
    return Object.keys($scope.selectedAssets)[0];
  }




});
