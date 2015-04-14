'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('instances-controller', function($scope, auth, server, $rootScope, $state, userProfile){

    var userProfile = userProfile.getUserProfile();

    server.get('/api/instance', {accountId: userProfile.dataCredentials.accountUuid}).then(function(data){
      $scope.instances = data._embedded.instance;
    });



  });
