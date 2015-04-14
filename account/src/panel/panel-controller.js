'use strict';

/**
 * Created by fyodorkhruschov on 03.04.15.
 */
angular.module('isf.panel')

.controller('panel-controller', function($scope, server, userProfile){

  var userProfile = userProfile.getUserProfile();

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
