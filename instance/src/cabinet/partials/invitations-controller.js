'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

  .controller('cabinet-invitations-controller', function($scope, auth, server){

    $scope.sendInvite = function(){

      delete $scope.successMessage;
      delete $scope.errorMessage;

      $scope.user.action = "create";
      $scope.user.dataCredentials.roles = ["instance_admin"];
      $scope.user.dataSettings = {
        "sendNotificationEmail": 1,
        "emailAlerts": 0,
        "active": 1
      };

      server.post('/api/instance/user/invite', $scope.user).then(function(){
        $scope.successMessage = true;
      }, function(){
        $scope.errorMessage = true;
      });
    };

  });
