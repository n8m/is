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
      },
      resolve: {
        checkInstance: function(auth){
          auth.checkInstance().then(function(){
            return true;
          }, function(){
            return false;
          })
        }
      }
    })
    //////////////////////////////////////not required auth states
    .state('base.login',{
      url: '/',
      controller: 'login-controller',
      templateUrl: 'login/login.html',
      resolve: {
        checkAuth: function(userProfile, $timeout, $state){
          //if userProfile is fetched - redirect to dashboard
          if(userProfile.getUserProfile){
            $timeout(function(){
              $state.go('base.main.dashboard');
            });
          }
        }
      }
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

            if(userProfile.checkIfFirstLogin(data)){
              userProfile.displayPrefixModal();
            }

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
    .state('base.main.assets', {
      url: '/assets',
      templateUrl: 'assets/assets-main.html',
      controller: 'assets-main-controller'
    })
    .state('base.main.assetsList', {
      url: '/assets-list/:category',
      templateUrl: 'assets/assets-list.html',
      controller: 'assets-list-controller'
    })
    .state('base.main.assetCreate', {
      url: '/asset/create',
      templateUrl: 'assets/new-asset-step1.html',
      controller: 'new-asset-controller'
    })
    .state('base.main.assetEditStep1', {
      url: '/asset/:assetId/step1',
      templateUrl: 'assets/new-asset-step1.html',
      controller: 'new-asset-controller'
    })
    .state('base.main.assetEditStep2', {
      url: '/asset/:assetId/step2',
      templateUrl: 'assets/new-asset-step2.html',
      controller: 'new-asset-controller'
    })
    .state('base.main.assetView', {
      url: '/asset/:assetId/view',
      //templateUrl: 'assets/new-asset-step2.html',
      //controller: 'new-asset-controller'
    })
    .state('base.main.assetEdit', {
      url: '/asset/:assetId/edit',
      //templateUrl: 'assets/new-asset-step2.html',
      //controller: 'new-asset-controller'
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
