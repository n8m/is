/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('new-asset-controller', function($scope, assetsService, $state, $stateParams, $modal, server, userProfile, tagsInputConvert){

  $scope.asset = {};
  $scope.getLinkedAssets = getLinkedAssets;

  //@todo refactor
  server.get('/api/asset/location', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.locations = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/supplier').then(function(data){
    $scope.suppliers = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/asset/status', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.statuses = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/asset/ownership-type', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.ownershipTypes = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/asset/category', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.categories = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/asset/sharing', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.shareOptions = data._embedded.items;
  });

  //@todo refactor
  server.get('/api/company', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
    $scope.companies = data._embedded.items;
  });


    if($stateParams.assetId){

      assetsService.queryAsset($stateParams.assetId).then(function(data){
        $scope.asset = data;

        if($scope.asset.qrCodeNumber){
          $scope.showQrInput = true;
        }

      }, function(response){
        console.log(response);
      });

    }


  $scope.showUploadModal = showUploadModal;
  $scope.showModalPurchaseInfo = showModalPurchaseInfo;
  $scope.showSupplierModal = showSupplierModal;
  $scope.showDeviceModal = showDeviceModal;
  $scope.showModalAddStatus = showModalAddStatus;
  $scope.showAddModal = showAddModal;

  $scope.next = next;
  $scope.save = save;
  $scope.removeProp = removeProp;
  $scope.categoryChangedCallback = categoryChangedCallback;
  $scope.ownershipTypeChangedCallback = ownershipTypeChangedCallback;
  $scope.companyChangedCallback = companyChangedCallback;


    function removeProp(prop){
    delete $scope.asset[prop];
  }

  function ownershipTypeChangedCallback(){

    delete $scope.asset.ownership.ownerCompany;

    server.get('/api/company', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
      $scope.companies = data._embedded.items;
    }, function(){
      $scope.companies = [];
      console.log(response);
    })

  }

  function companyChangedCallback(){
    delete $scope.asset.ownership.assignedDepartment;

    server.get('/api/department', {
      instanceUrl: userProfile.getInstanceUrl(),
      company: $scope.asset.ownership.assignedCompany
    }).then(function(data){
      $scope.departments = data._embedded.items;
    }, function(){
      $scope.departments = [];
      console.log(response);
    })
  }

  function categoryChangedCallback(){
    delete $scope.asset.deviceType;

    server.get('/api/asset/devicetype', {
      instanceUrl: userProfile.getInstanceUrl(),
      assetCategory: $scope.asset.category
    }).then(function(data){
      $scope.deviceTypes = data._embedded.items;
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
          return assetsService.getItemParameter(type, 'createUrl');
        },
        name: function(){
          return assetsService.getItemParameter(type, 'name');
        },
        itemPropertyName: function(){
          return assetsService.getItemParameter(type, 'itemPropertyName');
        },
        asset: function(){
          return $scope.asset;
        }
      }
    });

    var itemArrayName = assetsService.getItemParameter(type, 'itemArrayName');

    addModal.result.then(function(){
      server.get(assetsService.getItemParameter(type, 'createUrl'), {
        instanceUrl: userProfile.getInstanceUrl(),
        category: $scope.asset.category
      }).then(function(data){
        $scope[itemArrayName] = data._embedded.items;
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

  function showSupplierModal(){
    var supplierModal = $modal.open({
      templateUrl: 'assets/partials/supplier-add-modal.html',
      controller: 'supplier-add-modal-controller'
    });

    //@todo refactor (put into service)
    supplierModal.result.then(function(){
      server.get('/api/supplier').then(function(data){
        $scope.suppliers = data._embedded.items;
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
        $scope.deviceTypes = data._embedded.items;
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
        $scope.statuses = data._embedded.items;
      });
    })
  }

  function getLinkedAssets(query){
    return assetsService.getLinkedAssets(query, $stateParams.assetId);
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
      assetsService.postAsset(payload, $stateParams.assetId).then(function(data){
        $state.go('base.main.assetEditStep2', {assetId: data.data.id});
      }, function(response){
        console.log(response);
      });

  }

  function save(){

    var payload = angular.copy($scope.asset);

    payload.action = "update";
    payload.macAddresses = tagsInputConvert(payload.macAddresses);


    assetsService.postAsset(payload, $stateParams.assetId).then(function(data){

      $state.go('base.main.assetsList', {category: data.data.category.categoryKey})
    }, function(response){
      console.log(response);
    });


  }

});
