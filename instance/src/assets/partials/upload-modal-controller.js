/**
 * Created by fyodorkhruschov on 21.04.15.
 */
angular.module('isfi.assets')

.controller('upload-modal-controller', function($scope, type, $upload, $modalInstance, server, userProfile){

  $scope.uploadType = type;
  $scope.upload = upload;
  $scope.exit = exit;
  $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
  $scope.thumbs = [];


  server.post('/api/sign-s3-form', {
    'awsBucket': getBucket(),
    'key': '{$filename}'
  }).then(function(response){
    $scope.signature = response.data.signature;
    $scope.policy = response.data.policy;
    $scope.AWSAccessKeyId = response.data.AWSAccessKeyId;
  });


  $scope.$watch('files', function () {
    $scope.generateThumb();
  });

  $scope.generateThumb = function() {

    if($scope.files){
      for(var i = 0,len = $scope.files.length;i<len;i++){
        if ($scope.fileReaderSupported && $scope.files[i].type.indexOf('image') > -1) {
          var fileReader = new FileReader();
          fileReader.readAsDataURL($scope.files[i]);
          fileReader.onload = function(e) {
            $scope.thumbs.push(e.target.result);
            $scope.$digest();
          };
        }
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

  function upload(){

    var files = $scope.files;
    var file, key;

    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        file = files[i];

        //instanceUrl

        key = Math.round(Math.random()*10000) + '$$' + file.name;
        $upload.upload({
          url: 'http://' + getBucket() + '.s3.amazonaws.com/',
          method: 'POST',
          fields: {
            key: key,
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

          server.post('/api/file', {
            "action": "create",
            "instanceUrl": userProfile.getInstanceUrl(),
            "key": key,
            "mimeType": "image/jpeg",
            "thumbnail": $scope.thumbs[i],
            "type": "photo"
          }).then(function(data){
            $modalInstance.close(data.data.id);
          }, function(response){
            console.log(response);
          })

        }).error(function(data, status, headers, config){
          console.info('{Error: '+data+'}');
          return false;
        });
      }
    }
  }

  function exit(){
    $modalInstance.close();
  }

});
