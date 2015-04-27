/**
 * Created by fyodorkhruschov on 23.04.15.
 */
angular.module('isfi.cabinet')

  .factory('userCabinet', function($q, server, $timeout, userProfile){

    var _userDetails, _userSubscriptions, _instancesList;

    var userCabinet = {

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

        server.get('/api/profile/cabinet/details/' + userProfile.getUserProfile().id).then(function(data){
          userCabinet.setUserDetails(data);
          deferred.resolve(data);
        }, function(response){
          deferred.reject(response);
        });
        return deferred.promise;
      },
      saveUserDetails: function(user){
        var deferred = $q.defer();

        var payload = {
          action: "update",
          dataUser: user.dataUser
        };

        server.post('api/profile/cabinet/details/' + userProfile.getUserProfile().id, payload).then(function(data){
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

        server.get('/api/account/subscription/' + userProfile.getUserProfile().dataCredentials.accountUuid).then(function(data){
          userCabinet.setUserSubscriptions(data);
          deferred.resolve(data);
        }, function(response){
          deferred.reject(response);
        });
        return deferred.promise;
      },
      saveUserSubscriptions: function(user){
        var deferred = $q.defer();

        user.action = "update";
        server.post('/api/account/subscription/' + userProfile.getUserProfile().dataCredentials.accountUuid, user).then(function(data){
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

        server.get('/api/instance',  {accountId: userProfile.getUserProfile().dataCredentials.accountUuid}).then(function(data){
          userCabinet.setInstancesList(data);
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
          "accountUuid": userProfile.getUserProfile().dataCredentials.accountUuid
        };

        server.post('api/instance', payload).then(function(){
          deferred.resolve();
        }, function(){
          deferred.reject();
        });

        return deferred.promise;

      }
    };

    return userCabinet;
  });

