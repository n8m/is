/**
 * Created by fyodorkhruschov on 22.04.15.
 */
angular.module('isfi.customOption')


.directive('customOption', function($timeout){
  return {
    restrict: 'A',
    link: function(scope, el, attrs){

      var options = JSON.parse(attrs.customOption);

      var buttonText = options.buttonText;
      var func = options.click;
      var template = "<div class='custom-option-container'><button class='btn btn-primary'><span class='glyphicon glyphicon-plus-sign'></span>" + buttonText + "</button></div>";

      el.find('li.ui-select-choices-group').append(template);
      el.find('ul.ui-select-choices').removeAttr('ng-show');
      el.find('ul.ui-select-choices').removeClass('ng-hide');


      el.find('div.custom-option-container button').bind('click', function(){
        scope[func].apply();
      })

    }
  };
});
