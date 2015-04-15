'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-settings-controller', function($scope, auth, server, $rootScope, $state, userProfile){

  var user = userProfile.getUserProfile();

  server.get('/api/profile/cabinet/details/' + user.id).then(function(data){
    userProfile.setUserSettings(data);
    $scope.user = userProfile.getUserSettings();
  });

  $scope.save = function(){
    $scope.user.action = "update";
    server.post('api/account/details/' + user.dataCredentials.accountUuid, $scope.user);
  };

});
