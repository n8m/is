/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-controller', function(userProfile, server, $scope){

    var user = userProfile.getUserProfile();

    server.get('/api/profile/cabinet/details/' + user.id).then(function(data){
      userProfile.setUserSettings(data);
    });

    server.get('/api/account/subscription/' + user.dataCredentials.accountUuid).then(function(data){
      userProfile.setUserSubscriptions(data);
    });

});
