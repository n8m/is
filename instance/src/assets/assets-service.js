/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.factory('assets', function(server, $q){
  var _assets = {

  };

  var _categories = [
    {
      displayName: "Asset Accessories / Peripherals",
      value: "asset_accessories/peripherals"
    },
    {
      displayName: "AV Equipment",
      value: "av_equipment"
    },
    {
      displayName: "Computer",
      value: "computer"
    },
    {
      displayName: "Fax Machine / Telephone",
      value: "fax_machine/telephone"
    },
    {
      displayName: "Furniture",
      value: "furniture"
    },
    {
      displayName: "Mobile",
      value: "mobile"
    },
    {
      displayName: "Network Equipment",
      value: "network_equipment"
    },
    {
      displayName: "Other Equipment",
      value: "other_equipment"
    },
    {
      displayName: "Printer / Scanner",
      value: "printer/scanner"
    },
    {
      displayName: "Server (External Storage)",
      value: "server(external_storage)"
    },
    {
      displayName: "Software/License",
      value: "software/license"
    },
    {
      displayName: "Others",
      value: "others"
    }
  ];
  var _assetsStatuses = ["Operational", "In Repair", "Broken", "Lost/Stolen", "Disposed"];

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

    }
  };

  return exports;

});
