/**
 * Created by fyodorkhruschov on 16.04.15.
 */
'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

  .controller('massinvite-controller', function($scope, auth, server){

    $scope.sendInvite = function(){

      delete $scope.successMessage;
      delete $scope.errorMessage;

      $scope.user.action = "create";
      $scope.user.roles = ["instance_admin"];
      $scope.user.group = "";

      server.post('/api/instance/user/invite', $scope.user).then(function(){
        $scope.successMessage = true;
      }, function(){
        $scope.errorMessage = true;
      });
    };

  });
