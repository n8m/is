/**
 * Created by fyodorkhruschov on 16.04.15.
 */
angular.module('isfi.cabinet')

.controller('cabinet-controller', function(userProfile){
    userProfile.queryUserDetails();
});
