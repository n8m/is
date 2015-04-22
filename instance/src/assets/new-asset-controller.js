/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('new-asset-controller', function($scope, assets, $state, $location, $stateParams, $modal, server){

  $scope.deviceTypes = assets.getDeviceTypes();

  $scope.categories = assets.getCategories();
  $scope.assetsStatuses = assets.getAssetsStatuses();
  $scope.asset = {};

  server.get('/api/asset/location').then(function(data){
    $scope.locations = data._embedded.asset_location;
  });


  if($stateParams.assetId){
    server.get('/api/asset/' + $stateParams.assetId).then(function(data){
      $scope.asset = data;

    }, function(response){

    })
  }



  $scope.showUploadModal = showUploadModal;
  $scope.showModalAddLocation = showModalAddLocation;
  $scope.showModalPurchaseInfo = showModalPurchaseInfo;
  $scope.next = next;
  $scope.save = save;
  $scope.removeProp = removeProp;

  function removeProp(prop){
    delete $scope.asset[prop];
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
      server.get('/api/asset/location').then(function(data){
        $scope.locations = data._embedded.asset_location;
      });
    })
  }

  function showModalPurchaseInfo(){
    $modal.open({
      templateUrl: 'assets/partials/purchase-modal.html',
      controller: 'purchase-modal-controller'
    });
  }

  function next(){

      var payload = {
        "action": "create",
        "instanceUrl": $location.host().split('.')[0],
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
        $state.go('base.main.newAssetStep2', {assetId: data.data.id});
      }, function(response){
        console.log(response);
      });

  }

  function save(){

    $scope.asset.action = "update";

    assets.postAsset($scope.asset, $stateParams.assetId).then(function(data){
      $state.go('base.main.assetsList', {category: data.category})
    }, function(response){
      console.log(response);
    });


  }

});
