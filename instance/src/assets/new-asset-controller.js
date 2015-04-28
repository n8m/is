/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('new-asset-controller', function($scope, assets, $state, $stateParams, $modal, server, userProfile, tagsInputConvert){

  $scope.asset = {};
  $scope.getLinkedAssets = getLinkedAssets;


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

  //@todo refactor
  server.get('/api/asset/ownership-type', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.ownershipTypes = data._embedded.asset_ownership_type;
  });

  //@todo refactor
  server.get('/api/asset/category', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.categories = data._embedded.asset_category;
  });



    if($stateParams.assetId){

      server.get('/api/asset/' + $stateParams.assetId).then(function(data){
        $scope.asset = data;

        //@TODO: refactor this with API changes
        $scope.asset.category = $scope.asset.category ? $scope.asset.category.id : null;
        $scope.asset.deviceType = $scope.asset.deviceType ? $scope.asset.deviceType.id : null;
        $scope.asset.assignedLocation = $scope.asset.assignedLocation ? $scope.asset.assignedLocation.id : null;
        $scope.asset.ownership.ownershipType = $scope.asset.ownership ? $scope.asset.ownership.ownershipType.id : null;
        $scope.asset.status = $scope.asset.status ? $scope.asset.status.id : null;
        $scope.asset.supplier = $scope.asset.supplier ? $scope.asset.supplier.id : null;

        if($scope.asset.qrCodeNumber){
          $scope.showQrInput = true;
        }

        server.get('/api/asset/devicetype', {
          instanceUrl: userProfile.getInstanceUrl(),
          assetCategory: $scope.asset.category
        }).then(function(data){
          $scope.deviceTypes = data._embedded.asset_device_type;
          console.log(data);
        }, function(){
          $scope.deviceTypes = [];
        });


      }, function(response){

      })
    }




  $scope.showUploadModal = showUploadModal;
  $scope.showModalAddLocation = showModalAddLocation;
  $scope.showModalPurchaseInfo = showModalPurchaseInfo;
  $scope.showSupplierModal = showSupplierModal;
  $scope.showDeviceModal = showDeviceModal;
  $scope.showModalAddStatus = showModalAddStatus;
  $scope.showAddModal = showAddModal;

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

  function showAddModal(type){

    var addModal = $modal.open({
      templateUrl: 'assets/partials/add-modal.html',
      controller: 'add-modal-controller',
      resolve: {
        category: function(){
          return $scope.asset.category;
        },
        createUrl: function(){
          return assets.getItemParameter(type, 'createUrl');
        },
        name: function(){
          return assets.getItemParameter(type, 'name');
        },
        itemPropertyName: function(){
          return assets.getItemParameter(type, 'itemPropertyName');
        }
      }
    });


    addModal.result.then(function(){
      server.get(assets.getItemParameter(type, 'createUrl'), {
        instanceUrl: userProfile.getInstanceUrl()
      }).then(function(data){
        $scope.ownershipTypes = data._embedded.asset_ownership_type;
        console.log(data);
      })
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

  function getLinkedAssets(query){
    return assets.getLinkedAssets(query, $stateParams.assetId);
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

      $state.go('base.main.assetsList', {category: data.data.category.categoryKey})
    }, function(response){
      console.log(response);
    });


  }

});
