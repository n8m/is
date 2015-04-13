'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('subscription-details-controller', function($scope, auth, server, $rootScope, $state, countries){

    $scope.countries = countries;

    var userID;
    var accessToken = auth.getToken();

    server.get('/api/profile/login/' + accessToken).then(function(data){

      userID = data.id;

      server.get('/api/account/subscription/' + userID).then(function(data){
        console.log(data);
        $scope.user = data;
      });

    });

    $scope.save = function(){
      server.post('/api/account/subscription/' + userID, $scope.user);
    };

  });
