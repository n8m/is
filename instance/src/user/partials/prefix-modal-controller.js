/**
 * Created by fyodorkhruschov on 23.04.15.
 */
angular.module('isfi.user')

.controller('prefix-modal-controller', function($scope, $modalInstance, server, userProfile){

    $scope.exit = exit;
    $scope.setPrefix = setPrefix;

    function exit(){
      $modalInstance.close();
    }

    function setPrefix(){

      var payload = {
        "action": "update",
        "assetIdPrefix": $scope.prefix
      };

      server.post('/api/instance/' + userProfile.getInstanceUrl(), payload).then(function(data){
        console.log(data);
      }, function(response){
        console.log(response);
      })
    }

});
