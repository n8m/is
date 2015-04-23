/**
 * Created by fyodorkhruschov on 20.04.15.
 */
angular.module('isfi.assets')

.controller('assets-list-controller', function($scope, $stateParams, server, userProfile){

  server.get('/api/asset',
    {
      instanceUrl: userProfile.getInstanceUrl(),
      category: $stateParams.category
    }).then(function(data){
    $scope.assets = data._embedded.asset;
  }, function(response){
    console.log(response);
  });



});
