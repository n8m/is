'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.cabinet')

  .controller('subscriptions-controller', function($scope, countries, userProfile, $timeout){

    $scope.countries = countries;

    userProfile.getUserSubscriptions().then(function(data){

      $scope.user = data;
    }, function(response){
      //if error - request for userDetails again:
      userProfile.queryUserSubscriptions().then(function(data){
        $scope.user = data;
      })
    });

    $scope.save = function(){
      userProfile.saveUserSubscriptions($scope.user).then(function(){
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
    }

  });
