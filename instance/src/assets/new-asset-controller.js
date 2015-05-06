/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('new-asset-controller', function($scope, assetsService, $state, $stateParams, $modal, server, userProfile, tagsInputConvert){

  $scope.asset = {
    files:{
      photos:[],
      invoices:[],
      other:[]
    }
  };

  $scope.getLinkedAssets = getLinkedAssets;

  assetsService.queryLocations().then(function(data){
    $scope.locations = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.querySuppliers().then(function(data){
    $scope.suppliers = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.queryStatuses().then(function(data){
    $scope.statuses = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.queryOwnershipTypes().then(function(data){
    $scope.ownershipTypes = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.queryCategories().then(function(data){
    $scope.categories = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.querySharingTypes().then(function(data){
    $scope.sharingTypes = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.queryCompanies().then(function(data){
    $scope.companies = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  assetsService.queryUsers().then(function(data){
    $scope.users = data._embedded.items;
  }, function(response){
    console.log(response);
  });

  if($stateParams.assetId){

    assetsService.queryAsset($stateParams.assetId).then(function(data){
      $scope.asset = data;

      queryDeviceTypes();

      if($scope.asset.qrCodeNumber){
        $scope.showQrInput = true;
      }

    }, function(response){
      console.log(response);
    });

  }

  if($stateParams.categoryKey){

    server.get('/api/asset/category/' + $stateParams.categoryKey).then(function(data){
      $scope.asset.category = data;
    }, function(response){
      conosle.log('wrong category!');
      console.log(response);
    });

    $scope.asset.category = $stateParams.categoryKey;
  }


  $scope.showUploadModal = showUploadModal;
  $scope.showModalPurchaseInfo = showModalPurchaseInfo;
  $scope.showModalLeaseInfo = showModalLeaseInfo;
  $scope.showDeviceModal = showDeviceModal;
  $scope.showAddModal = showAddModal;
  $scope.showSupplierModal = showSupplierModal;

  $scope.next = next;
  $scope.save = save;
  $scope.removeProp = removeProp;
  $scope.categoryChangedCallback = categoryChangedCallback;
  $scope.ownershipTypeChangedCallback = ownershipTypeChangedCallback;
  $scope.companyChangedCallback = companyChangedCallback;
  $scope.sharingChangedCallback = sharingChangedCallback;


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

  function sharingChangedCallback(){
    delete $scope.asset.ownership.assignedCompany;
    delete $scope.asset.ownership.assignedDepartment;
    delete $scope.asset.ownership.assignedUser;
  }

  function companyChangedCallback(){
    delete $scope.asset.ownership.assignedDepartment;

    server.get('/api/department', {
      instanceUrl: userProfile.getInstanceUrl(),
      company: $scope.asset.ownership.assignedCompany.id
    }).then(function(data){
      $scope.departments = data._embedded.items;
    }, function(){
      $scope.departments = [];
      console.log(response);
    })
  }

  function categoryChangedCallback(){
    delete $scope.asset.deviceType;
    queryDeviceTypes();
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
        category: $scope.asset.category.id
      }).then(function(data){
        $scope[itemArrayName] = data._embedded.items;
        console.log(data);
      })
    })
  }

  function showUploadModal(type, property){

    var uploadModal = $modal.open({
      templateUrl: 'assets/partials/upload-modal.html',
      controller: 'upload-modal-controller',
      resolve: {
        type: function(){
          return type;
        }
      }
    });

    uploadModal.result.then(function(fileId){
      console.log(fileId);
      $scope.asset.files[property].push(fileId);
      console.log($scope.asset.files);
    }, function(response){
      console.log(response);
    })

  }

  function queryDeviceTypes(){
    assetsService.queryDeviceTypes($scope.asset.category.id).then(function(data){
      $scope.deviceTypes = data._embedded.items;
    }, function(response){
      console.log(response);
      $scope.deviceTypes = [];
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

    var purchaseModal, confirmModal;

    if($scope.asset.purchaseInfo){
      confirmModal = $modal.open({
        templateUrl: 'assets/partials/confirm-modal.html',
        controller: 'confirm-modal-controller',
        size: 'sm',
        resolve:{
          title: function(){
            return "Change to Purchase Information"
          },
          message: function(){
            return "Are you sure you want to change your selection? All input in this section will be discarded"
          }
        }
      });

      confirmModal.result.then(function(){
        openPurchaseModal();
      })

    }else{
      openPurchaseModal();
    }

    function openPurchaseModal(){
      purchaseModal = $modal.open({
        templateUrl: 'assets/partials/purchase-modal.html',
        controller: 'purchase-modal-controller',
        size: 'lg',
        resolve: {
          purchaseInfo: function(){
            return $scope.asset.purchaseInfo;
          }
        }
      });

      purchaseModal.result.then(function(data){
        $scope.asset.purchaseInfo = data.data.id;
      }, function(){
        console.log('dismiss');
      });
    }

  }

  function showModalLeaseInfo(){

    var leaseModal, confirmModal;

    if($scope.asset.leaseInfo){
      confirmModal = $modal.open({
        templateUrl: 'assets/partials/confirm-modal.html',
        controller: 'confirm-modal-controller',
        size: 'sm',
        resolve:{
          title: function(){
            return "Change to Lease Information"
          },
          message: function(){
            return "Are you sure you want to change your selection? All input in this section will be discarded"
          }
        }
      });

      confirmModal.result.then(function(){
        openLeaseModal();
      })

    }else{
      openLeaseModal();
    }

    function openLeaseModal(){
      leaseModal = $modal.open({
        templateUrl: 'assets/partials/lease-modal.html',
        controller: 'lease-modal-controller',
        size: 'lg',
        resolve: {
          leaseInfo: function(){
            return $scope.asset.leaseInfo;
          }
        }
      });

      leaseModal.result.then(function(data){
        $scope.asset.leaseInfo = data.data.id;
      })
    }


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
        "customerAssetId": $scope.asset.customerAssetId,
        "files": $scope.asset.files
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
