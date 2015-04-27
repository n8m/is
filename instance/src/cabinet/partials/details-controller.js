'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.cabinet')

  .controller('details-controller', function($scope, server, $timeout, userCabinet){

    userCabinet.getUserDetails().then(function(data){
      $scope.user = data;
    }, function(){
      //if error - request for userDetails again:
      userCabinet.queryUserDetails().then(function(data){
        $scope.user = data;
      })
    });

    $scope.save = function(){
      userCabinet.saveUserDetails($scope.user).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
        }, 3000);

      }, function(){
        $scope.errorMessage = true;

        $timeout(function(){
          $scope.errorMessage = false;
        }, 3000);

      });
    };
  });
