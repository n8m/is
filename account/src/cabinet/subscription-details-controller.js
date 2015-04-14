'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('subscription-details-controller', function($scope, auth, server, $rootScope, $state, countries, userProfile){

    $scope.countries = countries;
    var userProfile = userProfile.getUserProfile();

    server.get('/api/account/subscription/' + userProfile.dataCredentials.accountUuid).then(function(data){
      $scope.user = data;
    });

    $scope.save = function(){
      $scope.user.action = "update";
      server.post('/api/account/subscription/' + userProfile.dataCredentials.accountUuid, $scope.user);
    };

  });
