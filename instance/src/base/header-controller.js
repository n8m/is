/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isfi.base')

.controller('header-controller', function($scope, auth){
    $scope.logout = auth.logout;
});
