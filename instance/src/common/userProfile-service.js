/**
 * Created by fyodorkhruschov on 13.04.15.
 */
angular.module('isfi.user')

  //stores userInfo and cabinet stuff + getters/setters
.factory('userProfile', function($q, server, $timeout){

  var _userProfile, _userDetails, _userSubscriptions, _instancesList;

  var userProfile = {
    //profile
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

    //details
    setUserDetails: function(userDetails){
      _userDetails = userDetails;
      return _userDetails;
    },
    getUserDetails: function(){

      var deferred = $q.defer();

      if(_userDetails){
        deferred.resolve(_userDetails);
      } else{
        var counter = 0;
        function checkData(){
          $timeout(function(){
            if(_userDetails){
              deferred.resolve(_userDetails);
            } else{
              if(counter > 50){
                deferred.reject('http error');
              }
              counter++;
              checkData();
            }
          }, 100);
        }
        checkData();
      }

      return deferred.promise;

    },
    cleanUserDetails: function(){
      _userDetails = undefined;
    },
    queryUserDetails: function(){
      var deferred = $q.defer();

      server.get('/api/profile/cabinet/details/' + _userProfile.id).then(function(data){
        userProfile.setUserDetails(data);
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    saveUserDetails: function(user){
      var deferred = $q.defer();

      user.action = "update";
      server.post('api/account/details/' + _userProfile.id, user).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;
    },


    //subscriptions
    setUserSubscriptions: function(userSubscriptions){
      _userSubscriptions = userSubscriptions;
      return _userSubscriptions;
    },
    getUserSubscriptions: function(){

      var deferred = $q.defer();

      if(_userSubscriptions){
        deferred.resolve(_userSubscriptions);
      } else{

        var counter = 0;
        function checkData(){
          $timeout(function(){
            if(_userSubscriptions){
              deferred.resolve(_userSubscriptions);
            } else{
              if(counter > 50){
                deferred.reject('http error');
              }
              counter++;
              checkData();
            }
          }, 100);
        }
        checkData();
      }

      return deferred.promise;

    },
    cleanUserSubscriptions: function(){
      _userSubscriptions = undefined;
    },
    queryUserSubscriptions: function(){
      var deferred = $q.defer();

      server.get('/api/account/subscription/' + _userProfile.dataCredentials.accountUuid).then(function(data){
        userProfile.setUserSubscriptions(data);
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    saveUserSubscriptions: function(user){
      var deferred = $q.defer();

      user.action = "update";
      server.post('/api/account/subscription/' + _userProfile.dataCredentials.accountUuid, user).then(function(data){
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });

      return deferred.promise;
    },

    //instances
    setInstancesList: function(instancesList){
      _instancesList = instancesList;
      return _instancesList;
    },
    getInstancesList: function(){

      var deferred = $q.defer();

      if(_instancesList){
        deferred.resolve(_instancesList);
      } else{

        var counter = 0;
        function checkData(){
          $timeout(function(){
            if(_instancesList){
              deferred.resolve(_instancesList);
            } else{
              if(counter > 50){
                deferred.reject('http error');
              }
              counter++;
              checkData();
            }
          }, 100);
        }
        checkData();
      }

      return deferred.promise;

    },
    cleanInstancesList: function(){
      _instancesList = undefined;
    },
    queryInstancesList: function(){
      var deferred = $q.defer();

      server.get('/api/instance',  {accountId: _userProfile.dataCredentials.accountUuid}).then(function(data){
        userProfile.setInstancesList(data);
        deferred.resolve(data);
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    },
    createInstance: function(instanceUrl){

      var deferred = $q.defer();

      var payload = {
        "action": "create",
        "instanceUrl": instanceUrl,
        "accountUuid": _userProfile.dataCredentials.accountUuid
      };

      server.post('api/instance', payload).then(function(){
        deferred.resolve();
      }, function(){
        deferred.reject();
      });

      return deferred.promise;

    }
  };

  return userProfile;
});
