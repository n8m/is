'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-settings-controller', function($scope, auth, server, $rootScope, $state, userProfile){

  var userProfile = userProfile.getUserProfile();

  server.get('/api/profile/cabinet/details/' + userProfile.id).then(function(data){
    $scope.user = data;
  });

  $scope.save = function(){
    $scope.user.action = "update";
    server.post('api/account/details/' + userProfile.dataCredentials.accountUuid, $scope.user);
  };

});
