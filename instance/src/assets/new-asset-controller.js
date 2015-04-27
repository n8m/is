/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('new-asset-controller', function($scope, assets, $state, $stateParams, $modal, server, userProfile, tagsInputConvert){

  $scope.categories = assets.getCategories();
  $scope.assetsStatuses = assets.getAssetsStatuses();
  $scope.asset = {};
  $scope.getLinkedAssets = assets.getLinkedAssets;

  //@todo refactor
  server.get('/api/asset/location', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.locations = data._embedded.asset_location;
  });

  //@todo refactor
  server.get('/api/supplier').then(function(data){
    $scope.suppliers = data._embedded.supplier;
  });

  //@todo refactor
  server.get('/api/asset/status', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.statuses = data._embedded.asset_status;
  });




  if($stateParams.assetId){

    server.get('/api/asset/devicetype', {
      instanceUrl: userProfile.getInstanceUrl(),
      assetCategory: $scope.asset.category
    }).then(function(data){
      $scope.deviceTypes = data._embedded.asset_device_type;
      console.log(data);
    }, function(){
      $scope.deviceTypes = [];
    });

    server.get('/api/asset/' + $stateParams.assetId).then(function(data){
      $scope.asset = data;

    }, function(response){

    })
  }



  $scope.showUploadModal = showUploadModal;
  $scope.showModalAddLocation = showModalAddLocation;
  $scope.showModalPurchaseInfo = showModalPurchaseInfo;
  $scope.showSupplierModal = showSupplierModal;
  $scope.showDeviceModal = showDeviceModal;
  $scope.showModalAddStatus = showModalAddStatus;

  $scope.next = next;
  $scope.save = save;
  $scope.removeProp = removeProp;
  $scope.categoryChangedCallback = categoryChangedCallback;


  function removeProp(prop){
    delete $scope.asset[prop];
  }

  function categoryChangedCallback(){
    delete $scope.asset.deviceType;

    server.get('/api/asset/devicetype', {
      instanceUrl: userProfile.getInstanceUrl(),
      assetCategory: $scope.asset.category
    }).then(function(data){
      $scope.deviceTypes = data._embedded.asset_device_type;
      console.log(data);
    }, function(){
      $scope.deviceTypes = [];
    })

  }

  function showUploadModal(type){
    $modal.open({
      templateUrl: 'assets/partials/upload-modal.html',
      controller: 'upload-modal-controller',
      resolve: {
        type: function(){
          return type;
        }
      }
    });
  }

  function showModalAddLocation(){
    var locationModal = $modal.open({
      templateUrl: 'assets/partials/location-add-modal.html',
      controller: 'location-add-modal-controller'
    });

    //@todo refactor (put into service)
    locationModal.result.then(function(){
      server.get('/api/asset/location', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        $scope.locations = data._embedded.asset_location;
      });
    })
  }

  function showSupplierModal(){
    var supplierModal = $modal.open({
      templateUrl: 'assets/partials/supplier-add-modal.html',
      controller: 'supplier-add-modal-controller'
    });

    //@todo refactor (put into service)
    supplierModal.result.then(function(){
      server.get('/api/supplier').then(function(data){
        $scope.suppliers = data._embedded.supplier;
      });
    })
  }

  function showDeviceModal(){
    var deviceModal = $modal.open({
      templateUrl: 'assets/partials/device-add-modal.html',
      controller: 'device-add-modal-controller',
      resolve: {
        category: function(){
          return $scope.asset.category;
        }
      }
    });



    //@todo refactor (put into service)
    deviceModal.result.then(function(){
      server.get('/api/asset/devicetype', {
        instanceUrl: userProfile.getInstanceUrl(),
        assetCategory: $scope.asset.category
      }).then(function(data){
        $scope.deviceTypes = data._embedded.asset_device_type;
        console.log(data);
      })
    })
  }


  function showModalPurchaseInfo(){
    $modal.open({
      templateUrl: 'assets/partials/purchase-modal.html',
      controller: 'purchase-modal-controller'
    });
  }

  function showModalAddStatus(){
    var statusModal = $modal.open({
      templateUrl: 'assets/partials/status-add-modal.html',
      controller: 'status-add-modal-controller'
    });

    //@todo refactor (put into service)
    statusModal.result.then(function(){
      server.get('/api/asset/status', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        $scope.statuses = data._embedded.asset_status;
      });
    })
  }

  function next(){

      var payload = {
        "action": "create",
        "instanceUrl": userProfile.getInstanceUrl(),
        "name": $scope.asset.name,
        "category": $scope.asset.category,
        "description": $scope.asset.description,
        "deviceType": $scope.asset.deviceType,
        "qrCodeNumber": $scope.asset.qrCodeNumber,
        "customerAssetId": $scope.asset.customerAssetId
      };

      //@TODO: refactor
      if($stateParams.assetId){
        payload.action = "update";
      }
                                //@TODO: refactor
      assets.postAsset(payload, $stateParams.assetId).then(function(data){
        $state.go('base.main.assetEditStep2', {assetId: data.data.id});
      }, function(response){
        console.log(response);
      });

  }

  function save(){

    var payload = angular.copy($scope.asset);

    payload.action = "update";
    payload.macAddresses = tagsInputConvert(payload.macAddresses);


    assets.postAsset(payload, $stateParams.assetId).then(function(data){

      $state.go('base.main.assetsList', {category: data.data.category})
    }, function(response){
      console.log(response);
    });


  }

});
