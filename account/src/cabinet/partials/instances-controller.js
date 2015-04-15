'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('instances-controller', function($scope, auth, server, $rootScope, $state, userProfile){

    var userProfile = userProfile.getUserProfile();

    server.get('/api/instance', {accountId: userProfile.dataCredentials.accountUuid}).then(function(data){
      $scope.instances = data._embedded.instance;
    });

    $scope.createInstance = function(){

      delete $scope.successMessage;
      delete $scope.errorMessage;

      var payload = {
        "action": "create",
        "instanceUrl": $scope.instanceUrl,
        "accountUuid": userProfile.dataCredentials.accountUuid
      };

      server.post('api/instance', payload).then(function(){
        $scope.successMessage = true;
      }, function(){
        $scope.errorMessage = true;
      })
    }




  });
