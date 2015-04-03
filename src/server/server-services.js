'use strict';

angular.module('isf.server')

  .service('server', ['$http','$q','$rootScope', function ($http, $q, $rootScope) {

    var httpRoot = '',
        deferredRequests = [];

    // TODO: Listen for Event, then re-submit all the deferred requests
    //for (var i = 0; i < deferredRequests.length; i++) { ... }

    var service = {

      get: function (resource, filter) {

        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'GET',url:url,params:filter})
          .success(function(data,status,headers,request) {
            deferred.resolve(data);
          })
          .error(function(data,status,headers,config) {
            if (status === 401) {
              deferredRequests.push({config: config, deferred: deferred});
              deferred.reject({data:data,status:status});
            } else {
              deferred.reject(status);
            }

            $rootScope.$broadcast('httpError', status);
          });

        return deferred.promise;
      },

      post: function (resource, payload, filter) {
        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'POST',url:url,data:payload,params:filter})
          .success(function(data,status,headers,request) {
            if(data) {
              deferred.resolve({'data': data, 'headers': headers});
            } else {
              var _headers = headers();
              deferred.resolve({'status': status, 'headers': _headers});
            }
          })
          .error(function(data,status,headers,config) {
            if (status === 401) {
              deferredRequests.push({config: config, deferred: deferred});
              deferred.reject({data:data,status:status});
            } else {
              deferred.reject(status);
            }
          });
        return deferred.promise;
      },

      put: function (resource, payload, filter) {
        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'PUT',url:url,data:payload,params:filter})
          .success(function(data,status,headers,request) {
            if(data) {
              deferred.resolve({'data': data, 'headers': headers});
            } else {
              var _headers = headers();
              deferred.resolve({'status': status, 'headers': _headers});
            }
          })
          .error(function(data,status,headers,config) {
            if (status === 401) {
              deferredRequests.push({config: config, deferred: deferred});
              deferred.reject({data:data,status:status});
            } else {
              deferred.reject(status);
            }
          });
        return deferred.promise;
      },

      delete: function (resource) {
        var deferred = $q.defer();
        var url = httpRoot + resource;

        $http({method:'DELETE',url:url})
          .success(function(data,status,headers,request) {
            if(data) {
              deferred.resolve({'data': data, 'headers': headers});
            } else {
              var _headers = headers();
              deferred.resolve({'status': status, 'headers': _headers});
            }
          })
          .error(function(data,status,headers,config) {
            if (status === 401) {
              deferredRequests.push({config: config, deferred: deferred});
              deferred.reject({data:data,status:status});
            } else {
              deferred.reject(status);
            }
          });
        return deferred.promise;
      }
    };
    return service;

  }]);
