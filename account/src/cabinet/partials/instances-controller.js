'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('instances-controller', function($scope, auth, server, $rootScope, $state, userProfile){

    var userProfile = userProfile.getUserProfile();

    console.log(userProfile);

    server.get('/api/instance/' + userProfile.dataCredentials.accountUuid).then(function(data){
      console.log(data);
    });



  });
