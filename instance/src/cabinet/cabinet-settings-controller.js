'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

.controller('cabinet-settings-controller', function($scope, auth, server, $rootScope, $state){

  var accessToken = auth.getToken();

  server.get('/api/profile/login/' + accessToken).then(function(userProfile){
    server.get('/api/profile/cabinet/details/' + userProfile.id).then(function(data){
      $scope.user = data;
    });

    $scope.save = function(){
      $scope.user.action = "update";
      server.post('api/profile/cabinet/details/' + userProfile.id, $scope.user);
    };

  });





});
