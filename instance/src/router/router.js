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
          controller: 'base-controller',
        },
        'header@base': {templateUrl: 'base/partials/header.html'},
        'footer@base': {templateUrl: 'base/partials/footer.html'}
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
      url: '/assets-list/:categoryKey',
      templateUrl: 'assets/assets-list.html',
      controller: 'assets-list-controller'
    })
    .state('base.main.assetCreate', {
      url: '/asset/create/:categoryKey',
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
      views:{
        '':{
          templateUrl: 'assets/view-edit/main.html',
          controller: 'view-edit-asset-controller',
          resolve: {
            editSection: function(){
              return {
                titleSection: false,
                descriptionSection: false,
                locationSection: false,
                statusSection: false,
                techSection: false,
                photosUploadSection: false,
                invoicesUploadSection: false,
                filesUploadSection: false,
                ownershipSection: false,
                macAddressSection: false,
                purchaseOrderSection: false,
                purchaseDeliveryOrderSection: false,
                warrantySection: false,
                invoiceSection: false,
                voucherSection: false,
                chequeSection: false,
                leaseAgreementSection: false,
                linkedAssetsSection: false
              };
            }
          }
        },
        'title-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/title-section-view.html'
        },
        'title-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/title-section-edit.html'
        },
        'description-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/description-section-view.html'
        },
        'description-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/description-section-edit.html'
        },
        'location-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/location-section-view.html'
        },
        'location-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/location-section-edit.html'
        },
        'status-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/status-section-view.html'
        },
        'status-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/status-section-edit.html'
        },
        'tech-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/tech-section-view.html'
        },
        'tech-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/tech-section-edit.html'
        },
        'photos-upload-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/upload/photos-upload-section-view.html'
        },
        'photos-upload-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/upload/photos-upload-section-edit.html'
        },
        'invoices-upload-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/upload/invoices-upload-section-view.html'
        },
        'invoices-upload-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/upload/invoices-upload-section-edit.html'
        },
        'files-upload-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/upload/files-upload-section-view.html'
        },
        'files-upload-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/upload/files-upload-section-edit.html'
        },
        'ownership-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/ownership-section-view.html'
        },
        'ownership-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/ownership-section-edit.html'
        },
        'mac-address-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/mac-address-section-view.html'
        },
        'mac-address-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/mac-address-section-edit.html'
        },
        'purchase-order-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/purchase-order-section-view.html'
        },
        'purchase-order-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/purchase-order-section-edit.html'
        },
        'purchase-delivery-order-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/purchase-delivery-order-section-view.html'
        },
        'purchase-delivery-order-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/purchase-delivery-order-section-edit.html'
        },
        'cheque-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/cheque-section-view.html'
        },
        'cheque-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/cheque-section-edit.html'
        },
        'invoice-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/invoice-section-view.html'
        },
        'invoice-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/invoice-section-edit.html'
        },
        'voucher-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/voucher-section-view.html'
        },
        'voucher-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/voucher-section-edit.html'
        },
        'warranty-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/warranty-section-view.html'
        },
        'warranty-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/warranty-section-edit.html'
        },
        'lease-agreement-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/lease-agreement-section-view.html'
        },
        'lease-agreement-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/lease-agreement-section-edit.html'
        },
        'lease-delivery-order-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/lease-delivery-order-section-view.html'
        },
        'lease-delivery-order-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/lease-delivery-order-section-edit.html'
        },
        'linked-assets-section-view@base.main.assetView':{
          templateUrl: 'assets/view-edit/view/linked-assets-section-view.html'
        },
        'linked-assets-section-edit@base.main.assetView':{
          templateUrl: 'assets/view-edit/edit/linked-assets-section-edit.html'
        }
      }
    })
    .state('base.main.assetEdit', {
      url: '/asset/:assetId/edit',
      views:{
        '':{
          templateUrl: 'assets/view-edit/main.html',
          controller: 'view-edit-asset-controller',
          resolve: {
            editSection: function(){

              return {
                titleSection: true,
                descriptionSection: true,
                locationSection: true,
                statusSection: true,
                techSection: true,
                photosUploadSection: true,
                invoicesUploadSection: true,
                filesUploadSection: true,
                ownershipSection: true,
                macAddressSection: true,
                purchaseOrderSection: true,
                purchaseDeliveryOrderSection: true,
                warrantySection: true,
                invoiceSection: true,
                voucherSection: true,
                chequeSection: true,
                leaseAgreementSection: true,
                linkedAssetsSection: true
              };
            }
          }
        },
        'title-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/title-section-view.html'
        },
        'title-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/title-section-edit.html'
        },
        'description-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/description-section-view.html'
        },
        'description-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/description-section-edit.html'
        },
        'location-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/location-section-view.html'
        },
        'location-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/location-section-edit.html'
        },
        'status-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/status-section-view.html'
        },
        'status-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/status-section-edit.html'
        },
        'tech-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/tech-section-view.html'
        },
        'tech-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/tech-section-edit.html'
        },
        'photos-upload-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/upload/photos-upload-section-view.html'
        },
        'photos-upload-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/upload/photos-upload-section-edit.html'
        },
        'invoices-upload-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/upload/invoices-upload-section-view.html'
        },
        'invoices-upload-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/upload/invoices-upload-section-edit.html'
        },
        'files-upload-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/upload/files-upload-section-view.html'
        },
        'files-upload-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/upload/files-upload-section-edit.html'
        },
        'ownership-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/ownership-section-view.html'
        },
        'ownership-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/ownership-section-edit.html'
        },
        'mac-address-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/mac-address-section-view.html'
        },
        'mac-address-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/mac-address-section-edit.html'
        },
        'purchase-order-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/purchase-order-section-view.html'
        },
        'purchase-order-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/purchase-order-section-edit.html'
        },
        'purchase-delivery-order-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/purchase-delivery-order-section-view.html'
        },
        'purchase-delivery-order-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/purchase-delivery-order-section-edit.html'
        },
        'cheque-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/cheque-section-view.html'
        },
        'cheque-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/cheque-section-edit.html'
        },
        'invoice-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/invoice-section-view.html'
        },
        'invoice-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/invoice-section-edit.html'
        },
        'voucher-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/voucher-section-view.html'
        },
        'voucher-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/voucher-section-edit.html'
        },
        'warranty-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/warranty-section-view.html'
        },
        'warranty-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/warranty-section-edit.html'
        },
        'lease-agreement-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/lease-agreement-section-view.html'
        },
        'lease-agreement-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/lease-agreement-section-edit.html'
        },
        'lease-delivery-order-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/lease-delivery-order-section-view.html'
        },
        'lease-delivery-order-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/lease-delivery-order-section-edit.html'
        },
        'linked-assets-section-view@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/view/linked-assets-section-view.html'
        },
        'linked-assets-section-edit@base.main.assetEdit':{
          templateUrl: 'assets/view-edit/edit/linked-assets-section-edit.html'
        }
      }
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
