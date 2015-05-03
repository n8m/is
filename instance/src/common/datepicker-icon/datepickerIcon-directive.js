/**
 * Created by fyodorkhruschov on 03.05.15.
 */
angular.module('isfi.datepickerIcon')

.directive('bsDatepicker', function(){
    return {
      restrict: 'A',
      link: function(scope, el){
        el.parent().css({position: 'relative'});
        angular.element('<span style="position: absolute; right: 10px; top: 10px;" class="glyphicon glyphicon-calendar"></span>').insertAfter(el);
      }
    }
});
