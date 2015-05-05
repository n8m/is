/**
 * Created by fyodorkhruschov on 29.04.15.
 */
angular.module('isfi.assets')

.controller('view-edit-asset-controller', function($scope, $stateParams, assetsService, $q){

    queryAsset().then(function(data){
      queryDeviceTypes(data.category.id);
      queryPurchaseInfo(data.purchaseInfo);
      queryLeaseInfo(data.leaseInfo);
    });

    queryLocations();
    queryStatuses();
    querySuppliers();
    queryOwnershipTypes();
    querySharingTypes();
    queryCompanies();
    queryUsers();

    //view mode is 'view' by default
    $scope.editSection = {
      titleSection: false,
      descriptionSection: false,
      locationSection: false,
      statusSection: false,
      techSection: false,
      photosUploadSection: false,
      invoicesUploadSection: false,
      filesUploadSection: false,
      ownershipSection: false,
      macAddressSection: false,
      purchaseOrderSection: false
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

    function updatePurchaseInfo(section){

      $scope.purchaseInfo.action = 'update';

      assetsService.postPurchaseInfo($scope.purchaseInfo, $scope.asset.purchaseInfo).then(function(){
        queryPurchaseInfo($scope.asset.purchaseInfo);
        $scope.editSection[section] = false;
      }, function(){
        console.log('error');
      })
    }

    function queryOwnershipTypes(){
      assetsService.queryOwnershipTypes().then(function(data){
        $scope.ownershipTypes = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function querySharingTypes(){
      assetsService.querySharingTypes().then(function(data){
        $scope.sharingTypes = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryCompanies(){
      assetsService.queryCompanies().then(function(data){
        $scope.companies = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryUsers(){
      assetsService.queryUsers().then(function(data){
        $scope.users = data._embedded.items;
      }, function(response){
        console.log(response);
      });
    }

    function queryPurchaseInfo(puchaseInfoId){
      assetsService.queryPurchaseInfo(puchaseInfoId).then(function(data){
        $scope.purchaseInfo = data;
      }, function(response){
        console.log(response);
      })
    }

    function queryLeaseInfo(leaseInfoId){
      assetsService.queryLeaseInfo(leaseInfoId).then(function(data){
        $scope.leaseInfo = data;
      }, function(response){
        console.log(response);
      })
    }

    function saveSection(section){

      if(['purchaseOrderSection', 'deliveryOrderSection', 'invoiceSection', 'chequeSection', 'voucherSection'].indexOf(section) !== -1){
        updatePurchaseInfo(section);
      } else{
        updateAsset(section)
      }

    }

    function cancelSection(section){

      if(['purchaseOrderSection', 'deliveryOrderSection', 'invoiceSection', 'chequeSection', 'voucherSection'].indexOf(section) !== -1) {
        queryPurchaseInfo($scope.asset.purchaseInfo);
      } else{
        queryAsset();
      }

      $scope.editSection[section] = false;

    }

});
