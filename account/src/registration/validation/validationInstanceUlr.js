/**
 * Created by Ven King on 18.04.2015.
 */
(function(){
  'use strict';

  angular.module('validation')
    .directive('instanceUrl', instanceUrl);

    function instanceUrl(server) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          elem.on('blur', function () {
            server.get('/api/validation/instance-url', {instanceUrl: elem.val()}).then(function () {
              ctrl.$setValidity('invalidURL', true);
            }, function () {
              ctrl.$setValidity('invalidURL', false);
            })

          })
        }
      }
    }

})();
