/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    //base state which is not require auth
    .state('base', {
      abstract: true,
      templateUrl: 'base/base.html'
    })
    //////////////////////////////////////not required auth states
    .state('base.home', {
      url: '/',
      templateUrl: 'home/home.html'
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
    //base state which requires auth
    .state('main', {
      abstract: true,
      templateUrl: 'base/base.html',
      resolve: {
        auth: function(){
          console.log('here check auth');
        }
      }
    })
    ///////////////////////////////////required auth states
    .state('main.panel', {
      url: '/panel',
      templateUrl: 'panel/panel.html',
      controller: 'panel-controller'
    })
    .state('main.profileSettings', {
      url: '/profile/cabinet/settings',
      controller: 'profile-settings-controller',
      templateUrl: 'profile/profile-settings.html'
    })
    .state('main.subscriptionDetails', {
      url: '/profile/cabinet/subscription/details',
      controller: 'subscription-details-controller',
      templateUrl: 'profile/subscription-details.html'
    });

  $urlRouterProvider.otherwise('/');
});
