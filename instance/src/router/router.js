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
        '': {
          templateUrl: 'base/base.html',
          controller: 'base-controller'
        },
        'header@base': {templateUrl: 'base/partials/header.html'},
        'footer@base': {templateUrl: 'base/partials/footer.html'}
      }
    })
    //////////////////////////////////////not required auth states
    .state('base.home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'home-controller'
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
    .state('base.request-reset-password', {
      url: '/instance/reset/password',
      controller: 'request-reset-password-controller',
      templateUrl: 'reset-password/request-reset-password.html'
    })
    .state('base.reset-password', {
      url: '/instance/reset/password/:token',
      controller: 'reset-password-controller',
      templateUrl: 'reset-password/reset-password.html'
    })
    .state('base.checkInvite', {
      url: '/instance/user/invite/:token',
      controller: 'invitations-controller',
      templateUrl: 'invitations/invitations.html'
    })

    //base state which requires auth
    .state('base.main', {
      abstract: true,
      views: {
        '': {
          templateUrl: 'base/main.html',
          controller: 'main-controller'
        },
        'leftSide@base.main': {templateUrl: 'base/partials/left-side.html'},
        'rightSide@base.main': {templateUrl: 'base/partials/right-side.html'}
      },
      resolve: {
        authentication: function(auth, $state, $timeout, $q, userProfile){

          var deffered = $q.defer();

          auth.checkToken().then(function(data){
            userProfile.setUserProfile(data);
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
    .state('base.main.settings', {
      url: '/settings',
      templateUrl: 'plugs/settings.html'
    })
    .state('base.main.website', {
      url: '/website',
      templateUrl: 'plugs/website.html'
    })
    ///////////////////////////////////required auth states
    .state('base.main.cabinet', {
      abstract: true,
      templateUrl: 'cabinet/cabinet.html',
      controller: 'cabinet-controller'
    })
    .state('base.main.cabinet.details', {
      url: '/cabinet/details',
      controller: 'details-controller',
      templateUrl: 'cabinet/partials/details.html'
    })
    .state('base.main.cabinet.invitations', {
      url: '/cabinet/invitations',
      controller: 'cabinet-invitations-controller',
      templateUrl: 'cabinet/partials/invitations.html'
    })
    .state('base.main.cabinet.massinvite', {
      url: '/cabinet/massinvite',
      controller: 'massinvite-controller',
      templateUrl: 'cabinet/partials/massinvite.html'
    });


    $urlRouterProvider.otherwise('/');
});
