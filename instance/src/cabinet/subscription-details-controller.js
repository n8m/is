'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

  .controller('subscription-details-controller', function($scope, auth, server, $rootScope, $state, countries){

    $scope.countries = countries;
    var userProfile = {}; //will be instance.

    server.get('/api/account/subscription/' + userProfile.dataCredentials.accountUuid).then(function(data){
      $scope.user = data;
    });

    $scope.save = function(){
      $scope.user.action = "update";
      server.post('/api/account/subscription/' + userProfile.dataCredentials.accountUuid, $scope.user);
    };

  });
