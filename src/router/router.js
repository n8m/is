/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('base.dashboard', {
      url: 'dashboard',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'dashboard-controller'
    })
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
      url: 'profile/registration/success',
      templateUrl: 'registration/success.html',
      controller: 'registration-controller'
    })
    .state('base.login',{
      url: 'profile/login',
      controller: 'login-controller',
      templateUrl: 'login/login.html'
    });


  $urlRouterProvider.otherwise('/');
});
