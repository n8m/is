/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    //home is a parent state which require authentication
    //@todo: add check for auth
    .state('home', {
      url: '/home',
      template: '<ui-view></ui-view>'
    })
    //.state('home.profile', {
    //  url: '/profile',
    //  templateUrl: 'profile/profile.html',
    //  controller: 'profile-controller'
    //})

    //home is a parent state which isn't require authentication
    .state('base', {
      url: '/',
      templateUrl: 'base/base.html'
    })
    .state('base.pricing', {
      url: 'pricing',
      templateUrl: 'registration/pricing.html'
    })
    .state('base.registration', {
      url: 'profile/registration',
      templateUrl: 'registration/registration.html',
      controller: 'registration-controller'
    })
    .state('base.regSuccess', {
      url: 'profile/registration/success'
    })
    .state('base.login',{
      url: 'profile/login',
      controller: 'login-controller',
      templateUrl: 'login/login.html'
    });



  $urlRouterProvider.otherwise('/');
});
