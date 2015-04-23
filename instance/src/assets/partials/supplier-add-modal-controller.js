/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

  .controller('supplier-add-modal-controller', function($scope, server, $timeout, $location, $modalInstance){

    $scope.createSupplier = createSupplier;
    $scope.exit = exit;
    $scope.supplier = {};


    function createSupplier(){

      var payload = {
        "action": "create",
        "instanceUrl": $location.host().split('.')[0],
        "companyName": "",
        "title": $scope.supplier.title,
        "suffix": "",
        "city": "",
        "state": "",
        "address": "",
        "email": "",
        "phone": "",
        "firstName": "",
        "lastName": "",
        "country": "",
        "postcode": "",
        "website": "",
        "registrationNumber": "",
        "taxNumber": "",
        "notes": ""
      };

      server.post('/api/supplier', payload).then(function(){
        $scope.successMessage = true;

        $timeout(function(){
          $scope.successMessage = false;
          exit();
        }, 3000);

      })
    }

    function exit(){
      $modalInstance.close();
    }


  });
