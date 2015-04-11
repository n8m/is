/**
 * Created by fyodorkhruschov on 15.04.15.
 */
angular.module('isfi.home')

.controller('home-controller', function($rootScope, $state){
    if($rootScope.loggedIn){
      $state.go('base.main.dashboard');
    }
});
