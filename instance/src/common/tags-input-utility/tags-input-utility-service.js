/**
 * Created by fyodorkhruschov on 24.04.15.
 */
angular.module('isfi.tags-input-utility')

 //get array of object with properties 'text'
 //return array of strings
 // (this service for ngTagsInput directive)
.factory('tagsInputConvert', function(){
  return function(array){
    var output = [];

    for(var i = 0, len = array.length; i<len; i++){
      output.push(array[i].text);
    }

    return output;

  };
});
