/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('ipf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    //home is a parent state which require authentication
    //@todo: add check for auth
    .state('home', {
      url: '/home',
      template: '<ui-view></ui-view>'
    })
    .state('home.profile', {
      url: '/profile',
      templateUrl: 'profile/profile.html',
      controller: 'profile-controller'
    })

    //home is a parent state which isn't require authentication
    .state('base', {
      url: '/',
      template: '<ui-view></ui-view>'
    })
    .state('base.register', {
      url: 'register'
    })
    .state('base.login',{
      url: 'login'
    });



  $urlRouterProvider.otherwise('/');
});
