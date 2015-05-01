/**
 * Created by fyodorkhruschov on 29.04.15.
 */
angular.module('isfi.assets')

.controller('view-edit-asset-controller', function($scope, $stateParams, assetsService){

    queryAsset();

    //view mode is 'view' by default
    $scope.editSection = {
      titleSection: false,
      descriptionSection: false,
      locationSection: false,
      statusSection: false
    };

    $scope.updateAsset = updateAsset;
    $scope.saveSection = saveSection;
    $scope.cancelSection = cancelSection;

    //////////////////////////////functions///////////////////////////////

    function queryAsset(){
      assetsService.queryAsset($stateParams.assetId).then(function(data){
        $scope.asset = data;
      }, function(response){
        console.log(response);
      })
    }

    function updateAsset(section){
      assetsService.postAsset($scope.asset, $stateParams.assetId).then(function(){
        queryAsset();
        $scope.editSection[section] = false;
      }, function(){
        console.log('error');
      })
    }

    function saveSection(section){
      updateAsset(section)
    }

    function cancelSection(section){
      queryAsset();
      $scope.editSection[section] = false;
    }




});
