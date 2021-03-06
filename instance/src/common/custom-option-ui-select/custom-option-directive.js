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
      var type = options.type;
      var template = "<div class='custom-option-container'><button type='button' class='btn btn-primary'><span class='glyphicon glyphicon-plus-sign'></span>" + buttonText + "</button></div>";

      el.find('li.ui-select-choices-group').append(template);
      el.find('ul.ui-select-choices').removeAttr('ng-show');

      //watch and
      //remove ng-hide class to display this custom item even if there are no more items
      scope.$watch(function(){
        return el.find('ul.ui-select-choices').hasClass('ng-hide');
      }, function(newVal){
        if(newVal){
          $timeout(function() {
            el.find('ul.ui-select-choices').removeClass('ng-hide');
          });
        }
      });

      el.find('div.custom-option-container button').bind('click', function(){
        scope[func].apply(null, [type]);
      })

    }
  };
});
