'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.profile')

.controller('profile-settings-controller', function($scope, auth, server, $rootScope, $state){

    var token = auth.getToken();

    //@todo move token check into ui-router 'resolve' function
    if(token){

      var userID;

      server.get('/api/profile/login/' + token).then(function(data){
        $rootScope.loggedIn = true;

        userID = data.id;

        server.get('/api/profile/cabinet/' + userID).then(function(data){
          console.log(data);
          $scope.user = data;
        });

        $scope.save = function(){
          server.post('api/profile/cabinet/' + userID, $scope.user);
        };

      });
    } else{
      $rootScope.loggedIn = false;
      $state.go('base.login');
    }

    $scope.save = function(){

    };

});
