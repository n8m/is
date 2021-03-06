'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('instances-controller', function($scope, userProfile, $timeout){

    userProfile.getInstancesList().then(function(data){
      $scope.instances = data._embedded.items;
    }, function(response){
      //if error - request for userDetails again:
      userProfile.queryInstancesList().then(function(data){
        $scope.instances = data._embedded.items;
      })
    });

    $scope.createInstance = function(){

      userProfile.createInstance($scope.instanceUrl).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false
        }, 3000);

        //update instancesList
        userProfile.queryInstancesList().then(function(data){
          $scope.instances = data._embedded.items;
        });

      }, function(){
        $scope.errorMessage = true;

        $timeout(function(){
          $scope.errorMessage = false
        }, 3000);
      });

    }

  });
