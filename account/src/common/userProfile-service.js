/**
 * Created by fyodorkhruschov on 13.04.15.
 */
angular.module('isf.user')

.factory('userProfile', function(){

  var _userProfile, _userSettings, _userSubscriptions;

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
    },
    setUserSettings: function(userSettings){
      _userSettings = userSettings;
      return _userSettings;
    },
    getUserSettings: function(){
      return _userSettings;
    },
    cleanUserSettings: function(){
      _userSettings = undefined;
    },
    setUserSubscriptions: function(userSubscriptions){
      _userSubscriptions = userSubscriptions;
      return _userSubscriptions;
    },
    getUserSubscriptions: function(){
      return _userSubscriptions;
    },
    cleanUserSubscriptions: function(){
      _userSubscriptions = undefined;
    }
  };

  return userProfile;
});
