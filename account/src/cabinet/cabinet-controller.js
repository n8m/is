/**
 * Created by fyodorkhruschov on 14.04.15.
 */
angular.module('isf.cabinet')

.controller('cabinet-controller', function(userProfile){

    userProfile.queryUserDetails();
    userProfile.queryUserSubscriptions();
    userProfile.queryInstancesList();

});
