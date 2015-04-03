'use strict';

angular.module('isf.server')

  .service('server', ['$http','$q','$rootScope', function ($http, $q, $rootScope) {

    var httpRoot = '',
        deferredRequests = [];

    // TODO: Listen for Event, then re-submit all the deferred requests
    //for (var i = 0; i < deferredRequests.length; i++) { ... }

    var service = {
      /**
       * @ngdoc method
       * @methodOf App.ServerServices.service:Server
       * @name App.ServerServices.service:Server#get
       *
       * @description
       * Makes a GET request to the resource specified
       *
       * @param {string} resource The API endpoint
       * @param {Boolean=} filter Optional filter to apply to the resource
       * @param {Boolean=} cache Optional flag to tell Angular whether it should cache this request
       * @returns {HttpPromise} Future object
       */
      get: function (resource, filter) {

        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'GET',url:url,headers:{'Authorization': 'Basic ' + $rootScope.authToken},params:filter})
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
      /**
       * @ngdoc method
       * @methodOf App.ServerServices.service:Server
       * @name App.ServerServices.service:Server#post
       *
       * @description
       * Makes a POST request to the resource specified
       *
       * @param {string} resource The API endpoint
       * @param {Object} payload The payload provided with the POST
       * @param {Boolean=} filter Optional filter to apply to the resource
       * @returns {HttpPromise} Future object
       */
      post: function (resource, payload, filter) {
        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'POST',url:url,data:payload,headers:{'Authorization': 'Basic ' + $rootScope.authToken},params:filter})
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
      /**
       * @ngdoc method
       * @methodOf App.ServerServices.service:Server
       * @name App.ServerServices.service:Server#put
       *
       * @description
       * Makes a PUT request to the resource specified
       *
       * @param {string} resource The API endpoint
       * @param {Object} payload The payload provided with the POST
       * @param {Boolean=} filter Optional filter to apply to the resource
       * @returns {HttpPromise} Future object
       */
      put: function (resource, payload, filter) {
        var url, deferred = $q.defer();

        url = httpRoot + resource;

        $http({method:'PUT',url:url,data:payload,headers:{'Authorization': 'Basic ' + $rootScope.authToken},params:filter})
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
      /**
       * @ngdoc method
       * @methodOf App.ServerServices.service:Server
       * @name App.ServerServices.service:Server#delete
       *
       * @description
       * Makes a DELETE request to the resource specified
       *
       * @param {string} resource The API endpoint
       * @param {Object} payload The payload provided with the POST
       * @param {Boolean=} filter Optional filter to apply to the resource
       * @returns {HttpPromise} Future object
       */
      delete: function (resource) {
        var deferred = $q.defer();
        var url = httpRoot + resource;

        $http({method:'DELETE',url:url,headers:{'Authorization': 'Basic ' + $rootScope.authToken}})
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
