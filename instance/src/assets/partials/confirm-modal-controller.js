/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('confirm-modal-controller', function($scope, server, $timeout, $location, $modalInstance, title, message){

    $scope.ok = ok;
    $scope.exit = exit;
    $scope.title = title;
    $scope.message = message;


    function ok(){
      $modalInstance.close();
    }

    function exit(){
      $modalInstance.dismiss();
    }


  });
