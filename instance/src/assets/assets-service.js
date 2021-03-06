/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.factory('assetsService', function(server, $q, userProfile){
  var _assets = {

  };

  var _addItemData = {
    ownershipType: {
      createUrl: '/api/asset/ownership-type', //url for doing GET/POST request
      name: 'Ownership Type', //Human readable label for template
      itemPropertyName: 'ownershipTypeName', //name of the property for POST request
      itemArrayName: 'ownershipTypes' //arrayName for storing resource on frontend
    },
    category: {
      createUrl: '/api/asset/category',
      name: 'Category',
      itemPropertyName: 'categoryName',
      itemArrayName: 'categories'
    },
    company:{
      createUrl: 'api/company',
      name: 'Company',
      itemPropertyName: 'companyName',
      itemArrayName: 'companies'
    },
    department:{
      createUrl: 'api/department',
      name: 'Department',
      itemPropertyName: 'departmentName',
      itemArrayName: 'departments'
    },
    location:{
      createUrl: 'api/asset/location',
      name: 'Location',
      itemPropertyName: 'locationName',
      itemArrayName: 'locations'
    },
    status:{
      createUrl: '/api/asset/status',
      name: 'Status',
      itemPropertyName: 'statusName',
      itemArrayName: 'statuses'
    }
  };

  var exports = {
    getCategories: function(){
      return _categories;
    },
    getAssetsStatuses: function(){
      return _assetsStatuses;
    },
    postAsset: function(payload, assetId){
      var deferred = $q.defer();

      if(payload.category && payload.category.id){
        payload.category = payload.category.id;
      }

      if(payload.deviceType && payload.deviceType.id){
        payload.deviceType = payload.deviceType.id;
      }

      if(payload.assignedLocation && payload.assignedLocation.id){
        payload.assignedLocation = payload.assignedLocation.id;
      }

      if(payload.status && payload.status.id){
        payload.status = payload.status.id;
      }

      if(payload.supplier && payload.supplier.id){
        payload.supplier = payload.supplier.id;
      }

      if(payload.ownership){

        if(payload.ownership.ownershipType && payload.ownership.ownershipType.id){
          payload.ownership.ownershipType = payload.ownership.ownershipType.id;
        }

        if(payload.ownership.assignedCompany && payload.ownership.assignedCompany.id){
          payload.ownership.assignedCompany = payload.ownership.assignedCompany.id;
        }

        if(payload.ownership.assignedDepartment && payload.ownership.assignedDepartment.id){
          payload.ownership.assignedDepartment = payload.ownership.assignedDepartment.id;
        }

        if(payload.ownership.sharing && payload.ownership.sharing.id){
          payload.ownership.sharing = payload.ownership.sharing.id;
        }

      }

      if(assetId){
        payload.action = "update";
      } else{
        payload.action = "create";
      }

      var url = assetId ? '/api/asset/' + assetId : '/api/asset';

      server.post(url, payload).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    getDeviceTypes: function(){
      return _deviceTypes;
    },
    getLinkedAssets: function(query, currentAssetId){

      var deferred = $q.defer();

      var payload = {
        "instanceUrl": userProfile.getInstanceUrl(),
        "assetName": query,
        "currentAssetId": currentAssetId
      };

      server.get('/api/asset/search', payload).then(function(data){
        deferred.resolve(data._embedded.asset_search);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    getItemParameter: function(entity, parameter){
      return _addItemData[entity][parameter];
    },
    queryAsset: function(assetId){
      var deferred = $q.defer();

      server.get('/api/asset/' + assetId).then(function(data){


        if(data.warrantyExpirity){
          data.warrantyExpirity = data.warrantyExpirity.date.split(' ')[0];
        }


        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    postPurchaseInfo: function(payload, purchaseInfo){

      var url = purchaseInfo ? '/api/purchase-info/' + purchaseInfo : '/api/purchase-info';

      var deferred = $q.defer();
      server.post(url, payload).then(function(data){
        deferred.resolve(data)
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    postLeaseInfo: function(payload, leaseInfoId){

      var url = leaseInfoId ? '/api/lease-info/' + leaseInfoId : '/api/lease-info';

      var deferred = $q.defer();
      server.post(url, payload).then(function(data){
        deferred.resolve(data)
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    queryLeaseInfo: function(leaseInfoId){
      var deferred = $q.defer();

      server.get('/api/lease-info/' + leaseInfoId).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;
    },
    queryPurchaseInfo: function(purchaseInfoId){
      var deferred = $q.defer();

      server.get('/api/purchase-info/' + purchaseInfoId).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    },
    queryLocations: function(){
      var deferred = $q.defer();
      server.get('/api/asset/location', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    querySuppliers: function(){
      var deferred = $q.defer();
      server.get('/api/supplier', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryStatuses: function(){
      var deferred = $q.defer();
      server.get('/api/asset/status', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryOwnershipTypes: function(){
      var deferred = $q.defer();
      server.get('/api/asset/ownership-type', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryCategories: function(){
      var deferred = $q.defer();
      server.get('/api/asset/category', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    querySharingTypes: function(){
      var deferred = $q.defer();
      server.get('/api/asset/sharing', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryCompanies: function(){
      var deferred = $q.defer();
      server.get('/api/company', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryUsers: function(){
      var deferred = $q.defer();
      server.get('/api/asset/assigned-user', {instanceUrl: userProfile.getInstanceUrl()}).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    queryDeviceTypes: function(categoryId){
      var deferred = $q.defer();
      server.get('/api/asset/devicetype',
        {
          instanceUrl: userProfile.getInstanceUrl(),
          assetCategory: categoryId
        }).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    deleteAsset: function(assetId){

      var deferred = $q.defer();

      server.delete('api/asset/' + assetId, {action: "delete"}).then(function(data){
        deferred.resolve(data);
      }, function(){
        deferred.reject(data);
      });

      return deferred.promise;

    },
    queryAssetsList: function(categoryKey){
      var deferred = $q.defer();

      var payload = {
        instanceUrl: userProfile.getInstanceUrl(),
        category: categoryKey
      };

      server.get('/api/asset', payload).then(function(data){
          deferred.resolve(data);
        }, function(response){
          deferred.reject(response);
        });

      return deferred.promise;

    }
  };

  return exports;

});
