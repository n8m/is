/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('assets-list-controller', function($scope, $stateParams, server, $location){
  $scope.assets = ['1', '2', '3'];

  server.get('/api/asset', {instanceUrl: $location.host().split('.')[0], category: $stateParams.category}).then(function(data){
    $scope.assets = data._embedded.asset;
  }, function(response){
    console.log(response);
  });



});
