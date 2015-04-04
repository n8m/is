/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('base.dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'dashboard-controller'
    })
    .state('base', {
      abstract: true,
      templateUrl: 'base/base.html'
    })
    .state('base.main', {
      url: '/',
      templateUrl: 'main/main.html'
    })
    .state('base.pricing', {
      url: '/pricing',
      templateUrl: 'registration/pricing.html'
    })
    .state('base.registration', {
      url: '/profile/registration',
      templateUrl: 'registration/registration.html',
      controller: 'registration-controller'
    })
    .state('base.regSuccess', {
      url: '/profile/registration/success?uniqueUrl',
      templateUrl: 'registration/registration-success.html',
      controller: 'registration-success-controller'
    })
    .state('base.login',{
      url: '/profile/login',
      controller: 'login-controller',
      templateUrl: 'login/login.html'
    })
    .state('base.activation', {
      url: '/profile/activate/:token',
      controller: 'activation-controller',
      templateUrl: 'activation/activation.html'
    })
    .state('base.profileSettings', {
      url: '/profile/cabinet/settings',
      controller: 'profile-settings-controller',
      templateUrl: 'profile/profile-settings.html'
    })
    .state('base.subscriptionDetails', {
      url: '/profile/cabinet/subscription/details',
      controller: 'subscription-details-controller',
      templateUrl: 'profile/subscription-details.html'
    });

  $urlRouterProvider.otherwise('/');
});
