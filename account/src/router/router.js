'use strict';

/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isf.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    //base state which is not require auth
    .state('base', {
      abstract: true,
      templateUrl: 'base/base.html',
      controller: 'base-controller'
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
      url: '/account/registration',
      templateUrl: 'registration/registration.html',
      controller: 'registration-controller'
    })
    .state('base.regSuccess', {
      url: '/account/registration/success?instanceUrl',
      templateUrl: 'registration/registration-success.html',
      controller: 'registration-success-controller'
    })
    .state('base.login',{
      url: '/profile/login',
      controller: 'login-controller',
      templateUrl: 'login/login.html'
    })
    .state('base.activation', {
      url: '/account/activate/:token',
      controller: 'activation-controller',
      templateUrl: 'activation/activation.html'
    })
    .state('base.request-reset-password', {
      url: '/profile/reset/password',
      controller: 'request-reset-password-controller',
      templateUrl: 'reset-password/request-reset-password.html'
    })
    .state('base.reset-password', {
      url: '/profile/reset/password/:token',
      controller: 'reset-password-controller',
      templateUrl: 'reset-password/reset-password.html'
    })
    //base state which requires auth
    .state('main', {
      abstract: true,
      templateUrl: 'base/base.html',
      controller: 'base-controller',
      resolve: {
        authentication: function(auth, $state, $timeout, $q, userProfile){

          var deffered = $q.defer();

          auth.checkToken().then(function(data){
            userProfile.setUserProfile(data);
            console.log('here');
            deffered.resolve();
          }, function(){
            auth.refreshToken().then(function(){
              deffered.resolve();
            }, function(){
              $timeout(function(){
                $state.go('base.login');
              });
              deffered.reject();
            });

          });

          return deffered.promise;
        }
      }
    })
    ///////////////////////////////////required auth states
    .state('main.panel', {
      url: '/panel',
      templateUrl: 'panel/panel.html',
      controller: 'panel-controller'
    })
    .state('main.cabinet', {
      abstract: true,
      templateUrl: 'cabinet/cabinet.html',
      controller: 'cabinet-controller',
      resolve: {
        user: function($q, userProfile, server, $timeout){

          //console.log('start resolving');
          //
          //if(userProfile.getUserProfile()){
          //  var promise = userProfile.queryUserDetails();
          //} else{
          //
          //}
          //
          //return $q.all([promise]);

        }
      }
    })
    .state('main.cabinet.details', {
      url: '/account/cabinet/details',
      controller: 'details-controller',
      templateUrl: 'cabinet/partials/details.html'
    })
    .state('main.cabinet.subscriptions', {
      url: '/account/cabinet/subscriptions',
      controller: 'subscriptions-controller',
      templateUrl: 'cabinet/partials/subscriptions.html'
    })
    .state('main.cabinet.instances', {
      url: '/account/cabinet/instances',
      controller: 'instances-controller',
      templateUrl: 'cabinet/partials/instances.html'
    });

  $urlRouterProvider.otherwise('/');
});
