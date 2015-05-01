/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.factory('assetsService', function(server, $q, userProfile){
  var _assets = {

  };

  var _addItemData = {
    ownershipType: {
      createUrl: '/api/asset/ownership-type',
      name: 'Ownership Type',
      itemPropertyName: 'ownershipTypeName',
      itemArrayName: 'ownershipTypes'
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
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    }
  };

  return exports;

});
