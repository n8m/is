/**
 * Created by fyodorkhruschov on 02.04.15.
 */
angular.module('isfi.router', [])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    //base state which is not require auth
    .state('base', {
      abstract: true,
      views: {
        '': {templateUrl: 'base/base.html'},
        'header@base': {templateUrl: 'base/header.html'},
        'footer@base': {templateUrl: 'base/footer.html'}
      }
    })
    //////////////////////////////////////not required auth states
    .state('base.home', {
      url: '/',
      templateUrl: 'base/base.html'
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
      url: '/instance/activate/:token',
      controller: 'activation-controller',
      templateUrl: 'activation/activation.html'
    })
    //base state which requires auth
    .state('base.main', {
      abstract: true,
      views: {
        '': {templateUrl: 'base/main.html'},
        'leftSide@base.main': {templateUrl: 'base/left-side.html'}
      },
      resolve: {
        authentication: function($rootScope, auth, $state, $timeout, $q){

          var deffered = $q.defer();

          auth.checkToken().then(function(){
            $rootScope.loggedIn = true;
            deffered.resolve();
          }, function(){

            auth.refreshToken().then(function(){
              $rootScope.loggedIn = true;
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
    .state('base.main.dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'dashboard-controller'
    })
    .state('base.main.profileSettings', {
      url: '/profile/cabinet/settings',
      controller: 'profile-settings-controller',
      templateUrl: 'profile/profile-settings.html'
    })
    .state('base.main.subscriptionDetails', {
      url: '/profile/cabinet/subscription/details',
      controller: 'subscription-details-controller',
      templateUrl: 'profile/subscription-details.html'
    })
    .state('base.main.asset', {
      url: '/asset',
      templateUrl: 'plugs/asset.html'
    })
    .state('base.main.device', {
      url: '/device',
      templateUrl: 'plugs/device.html'
    })
    .state('base.main.network', {
      url: '/network',
      templateUrl: 'plugs/network.html'
    })
    .state('base.base.settings', {
      url: '/settings',
      templateUrl: 'plugs/settings.html'
    })
    .state('base.main.website', {
      url: '/website',
      templateUrl: 'plugs/website.html'
    });

  $urlRouterProvider.otherwise('/');
});
