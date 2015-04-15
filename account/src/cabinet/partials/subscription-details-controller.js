'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('subscription-details-controller', function($scope, auth, server, $rootScope, $state, countries, userProfile){

    $scope.countries = countries;
    var user = userProfile.getUserProfile();

    $scope.user = userProfile.getUserSubscriptions();

    $scope.save = function(){
      $scope.user.action = "update";
      server.post('/api/account/subscription/' + user.dataCredentials.accountUuid, $scope.user);
    };

  });
