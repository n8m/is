/**
 * Created by fyodorkhruschov on 29.04.15.
 */
angular.module('isfi.assets')

.controller('view-edit-asset-controller', function($scope, $stateParams, assetsService, $q){

    queryAsset().then(function(data){
      queryDeviceTypes(data.category.id);
    });

    queryLocations();
    queryStatuses();
    querySuppliers();

    //view mode is 'view' by default
    $scope.editSection = {
      titleSection: false,
      descriptionSection: false,
      locationSection: false,
      statusSection: false,
      techSection: false
    };

    $scope.updateAsset = updateAsset;
    $scope.saveSection = saveSection;
    $scope.cancelSection = cancelSection;
    $scope.removeProp = removeProp;

    //////////////////////////////functions///////////////////////////////

    function removeProp(prop){
      delete $scope.asset[prop];
    }

    function queryStatuses(){
      assetsService.queryStatuses().then(function(data){
        $scope.statuses = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryDeviceTypes(){
      assetsService.queryDeviceTypes($scope.asset.category.id).then(function(data){
        $scope.deviceTypes = data._embedded.items;
      }, function(response){
        console.log(response);
        $scope.deviceTypes = [];
      });
    }

    function querySuppliers(){
      assetsService.querySuppliers().then(function(data){
        $scope.suppliers = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryLocations(){
      assetsService.queryLocations().then(function(data){
        $scope.locations = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryAsset(){
      var deferred = $q.defer();
      assetsService.queryAsset($stateParams.assetId).then(function(data){
        deferred.resolve(data);
        $scope.asset = data;

        if($scope.asset.qrCodeNumber){
          $scope.showQrInput = true;
        }

      }, function(response){
        deferred.reject(response);
        console.log(response);
      });
      return deferred.promise;
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
