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
    //base state which requires auth
    .state('main', {
      abstract: true,
      templateUrl: 'base/base.html',
      resolve: {
        auth: function($rootScope, auth, $state, $timeout, $q){

          var deffered = $q.defer();

          auth.checkToken().then(function(){
            deffered.resolve();
          }, function(){

            auth.refreshToken().then(function(){
              deffered.resolve();
            }, function(){
              $timeout(function(){
                $rootScope.loggedIn = false;
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
