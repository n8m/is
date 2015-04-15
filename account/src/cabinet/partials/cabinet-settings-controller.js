'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-settings-controller', function($scope, auth, server, $rootScope, $state, userProfile){

  var user = userProfile.getUserProfile();

  $scope.user = userProfile.getUserSettings();

  $scope.save = function(){
    $scope.user.action = "update";
    server.post('api/account/details/' + user.dataCredentials.accountUuid, $scope.user);
  };

});
