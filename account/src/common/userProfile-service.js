/**
 * Created by fyodorkhruschov on 13.04.15.
 */
angular.module('isf.user')

.factory('userProfile', function(){

  var _userProfile;

  var userProfile = {
    setUserProfile: function(userProfile){
      _userProfile = userProfile;
      return _userProfile;
    },
    getUserProfile: function(){
      return _userProfile;
    },
    cleanUserProfile: function(){
      _userProfile = undefined;
    }
  };

  return userProfile;
});
