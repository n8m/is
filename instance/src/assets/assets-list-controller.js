/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('assets-list-controller', function($scope, $stateParams, server, userProfile, $modal, assetsService, $q){

  $scope.categoryKey = $stateParams.categoryKey;
  $scope.assetCheckedCallback = assetCheckedCallback;
  $scope.changeAllCheckboxes = changeAllCheckboxes;
  $scope.countSelectedAssets = countSelectedAssets;
  $scope.getIdSelectedAsset = getIdSelectedAsset;
  $scope.deleteAssets = deleteAssets;
  $scope.selectedAssets = {};

  queryAssetsList($scope.categoryKey);

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

  function queryAssetsList(categoryKey){
    assetsService.queryAssetsList(categoryKey).then(function(data){
      $scope.assets = data._embedded.items;
    }, function(response){
      console.log(response);
    })
  }

  function deleteAssets(){
    confirmModal = $modal.open({
      templateUrl: 'assets/partials/confirm-modal.html',
      controller: 'confirm-modal-controller',
      size: 'sm',
      resolve:{
        title: function(){
          return "Deleting Assets";
        },
        message: function(){
          return "Are you sure you want to delete " + countSelectedAssets() + " assets";
        }
      }
    });

    confirmModal.result.then(function(data){

      console.log('here?');

      var deletePromisesArray = [];

      for(var key in $scope.selectedAssets){
        deletePromisesArray.push(assetsService.deleteAsset(key));
      }

      $q.all(deletePromisesArray).then(function(){
        queryAssetsList($scope.categoryKey);
      }, function(){
        console.log('Something Goes Wrong');
      })

    }, function(response){
      console.log(response);
    })

  }




});
