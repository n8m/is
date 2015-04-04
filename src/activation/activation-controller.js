/**
 * Created by fyodorkhruschov on 04.04.15.
 */
angular.module('isf.activation')

.controller('activation-controller', function($state, $stateParams, server){

    var token = $stateParams.token;

    if(token){
      server.get('/api/profile/activate/' + token).then(function(data){
        console.log(data);
      }, function(response){
        console.log(response);
      })

    } else{
      $state.go('base.main');
    }



});
