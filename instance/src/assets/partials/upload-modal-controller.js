/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

.controller('upload-modal-controller', function($scope, type, $upload, $modalInstance, server){

  $scope.uploadType = type;
  $scope.upload = upload;
  $scope.exit = exit;
  $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

  server.post('/api/sign-s3-form', {
    'awsBucket': getBucket(),
    'key': '{$filename}'
  }).then(function(response){
    $scope.signature = response.data.signature;
    $scope.policy = response.data.policy;
    $scope.AWSAccessKeyId = response.data.AWSAccessKeyId;
  });

  $scope.generateThumb = function(file) {
    if (file != null) {
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function(e) {
          file.dataUrl = e.target.result;
        };
      }
    }
  };

  function getBucket() {
    if (type == 'Photos') {
        return 'isitup-assets-photos';
    } else if (type == 'Invoices') {
        return 'isitup-assets-invoices';
    } else {
        return 'isitup-assets-other';
    }
  }

  function upload(files){
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $scope.generateThumb(file);
        $upload.upload({
          url: 'http://' + getBucket() + '.s3.amazonaws.com/',
          method: 'POST',
          fields: {
            key: Math.round(Math.random()*10000) + '$$' + file.name,
            AWSAccessKeyId: $scope.AWSAccessKeyId,
            acl: 'public-read',
            policy: $scope.policy, // base64-encoded json policy (see article below)
            signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
            'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
            filename: file.name // this is needed for Flash polyfill IE8-9
          },
          file: file,
          headers: {
            'Authorization': undefined
          }
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function(data, status, headers, config){
          console.info('{Error: '+data+'}');
          return false;
        });
      }
    }
  }

  function exit(){
    $modalInstance.close();
  };

});
