/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.factory('assets', function(server, $q, userProfile){
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
  var _deviceTypes = {
    'computer': [
      {
        displayName: 'Laptop',
        value: 'laptop'
      },
      {
        displayName: 'Desktop',
        value: 'desktop'
      },
      {
        displayName: 'Other',
        value: 'other'
      }
    ],
    'printer/scanner': [
      {
        displayName: 'Dot Matrix',
        value: 'dot_matrix'
      },
      {
        displayName: 'Ink-jet',
        value: 'ink_jet'
      },
      {
        displayName: 'Laser',
        value: 'laser'
      },
      {
        displayName: 'Thermal Printer',
        value: 'thermal_printer'
      },
      {
        displayName: 'Dye-Sublimation Printer',
        value: 'dye_sublimation_printer'
      },
      {
        displayName: 'Photo Printer',
        value: 'photo_printer'
      },
      {
        displayName: 'All-in-One Printer',
        value: 'all_in_one_printer'
      },
      {
        displayName: 'Plotter',
        value: 'plotter'
      },
      {
        displayName: '3D Printer',
        value: '3d_printer'
      },
      {
        displayName: 'Wireless Printer',
        value: 'wireless_printer'
      }
    ],
    'mobile': [
      {
        displayName: 'Phone',
        value: 'phone'
      },
      {
        displayName: 'Tablet',
        value: 'tablet'
      },
      {
        displayName: 'Other',
        value: 'other'
      }
    ]
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
    getLinkedAssets: function(query){

      var deferred = $q.defer();

      var payload = {
        "instanceUrl": userProfile.getInstanceUrl(),
        "assetName": query
      };

      server.get('/api/asset/search/', payload).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;

    }
  };

  return exports;

});
