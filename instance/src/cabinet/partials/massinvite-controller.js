/**
 * Created by fyodorkhruschov on 16.04.15.
 */
'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

  .controller('massinvite-controller', function($scope, $timeout, server){

    $scope.sendInvite = function(){

      delete $scope.successMessage;
      delete $scope.errorMessage;

      var payload = {
        action: 'create',
        roles: ['instance_admin'],
        group: '',
        notificationDate: $scope.user.notificationDate,
        expireDays: $scope.user.expireDays,
        emails: []
      };


      for(var i = 0;i<$scope.user.emails.length;i++){
        payload.emails.push($scope.user.emails[i].text);
      }

      server.post('/api/instance/user/invite', payload).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
        },3000);

        $scope.user = {};
      }, function(){
        $scope.errorMessage = true;

        $timeout(function(){
          $scope.errorMessage = false;
        }, 3000);

      });
    };

  });
