/**
 * Created by fyodorkhruschov on 13.04.15.
 */
angular.module('isfi.user')

  //stores userInfo and cabinet stuff + getters/setters
.factory('userProfile', function($q, server, $timeout, $modal, $location){

  var _userProfile;

  var userProfile = {
    //profile
    getInstanceUrl: function(){

      if(_userProfile && _userProfile.dataCredentials.instanceUrl){
        return _userProfile.dataCredentials.instanceUrl;
      } else{
        return $location.host().split('.')[0];
      }
    },
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
    checkIfFirstLogin: function(data){
      return data.options && data.options.firstLogin;
    },
    displayPrefixModal: function(){
      $modal.open({
        templateUrl: 'user/partials/prefix-modal.html',
        controller: 'prefix-modal-controller'
      });
    }
  };

  return userProfile;
});
