/**
 * Created by fyodorkhruschov on 23.04.15.
 */
angular.module('isfi')

.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    autoclose: true,
    dateFormat: 'yyyy-MM-dd',
    modelDateFormat: 'yyyy-MM-dd',
    dateType: 'string'
  });
});
