'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-settings-controller', function($scope, auth, server, $rootScope, $state){

  var userID;
  var accessToken = auth.getToken();

  server.get('/api/profile/login/' + accessToken).then(function(data){
    $rootScope.loggedIn = true;

    userID = data.id;

    server.get('/api/profile/cabinet/details/' + userID).then(function(data){
      console.log(data);
      $scope.user = data;
    });

    $scope.save = function(){

      $scope.user.action = "update";

      var payload = {
        action: "update",
        dataUser:{
          firstName: $scope.user.dataUser.firstName,
          lastName: $scope.user.dataUser.lastName
        }

      };

      server.post('api/account/details/' + userID, payload);
    };

  });


    $scope.save = function(){

    };

});
