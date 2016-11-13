(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('HomeController', ['$scope', '$state', 'FirebaseService', 'FileReader', 'FileSocket', 'UploadService', 'md5', HomeController]);

  function HomeController($scope, $state, FirebaseService, FileReader, FileSocket, UploadService, md5) {
    var cryptKey = "HelloWorldCryptoKey";

    $scope.upload = function(encode) {
      if(encode) {
        var file = document.getElementById('fileUpload').files[0];
      } else {
        var file = document.getElementById('fileDecrypt').files[0];
      }
      console.log("Uploaded new file", file);
      //Begin sending the file
      UploadService.newFile(file, encode);
      sendRequest(file);
    }

    if(!UploadService.authenticate())
    {
      console.log('Back to login');
      $state.go('login');
    }

    var sendRequest = function(file) {
      var pin = Math.floor(Math.random()*900000) + 100000;
      FileSocket.emit('key.request', {
        pin: pin,
        file: md5.createHash(file.name)
      });
      $state.go('pin', {pin: pin});
    };
  }
})();
