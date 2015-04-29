/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.factory('assets', function(server, $q, userProfile){
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
      createUrl: 'api/asset/company',
      name: 'Company',
      itemPropertyName: 'companyName',
      itemArrayName: 'companies'
    },
    department:{
      createUrl: 'api/asset/department',
      name: 'Department',
      itemPropertyName: 'departmentName',
      itemArrayName: 'departments'
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
    }

  };

  return exports;

});
