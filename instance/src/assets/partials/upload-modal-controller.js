/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

.controller('upload-modal-controller', function($scope, type, $upload){
  $scope.uploadType = type;

  $scope.upload = upload;

  function upload(files){
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $upload.upload({
          url: 'upload/url',
          fields: {
            key: 'something',
            AWSAccessKeyId:"",
            acl: 'public',
            filename: "asd"
          },
          file: file
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        });
      }
    }
  }

});
