(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('HomeController', ['$scope', '$crypto', 'FirebaseService', 'FileReader', 'FileSocket', 'md5', HomeController]);

  function HomeController($scope, $crypto, FirebaseService, FileReader, FileSocket, md5) {
    var authenticated = false;
    var currentFile = undefined;
    var cryptKey = "HelloWorldCryptoKey";

    $scope.upload = function() {
      var file = document.getElementById('fileUpload').files[0];
      console.log("Uploaded new file", file);
      //Begin sending the file
      currentFile = file;
      sendRequest();
    }

    var sendAuth = function() {
      var authValue = {
        deviceType: "computer",
        userID: firebase.auth().currentUser.uid
      }
      console.log('Authenticated');
      FileSocket.emit('user.auth', authValue);
    }

    if(!authenticated) {
      sendAuth();
      authenticated = true;
    }

    var sendRequest = function() {
      FileSocket.emit('key.request');
    };

    var sendInfo = function() {
      FileSocket.emit('file.info', md5.createHash(file.name));
    };

    FileSocket.on('file.info', function() {
      sendInfo();
    });

    FileSocket.on('pin.display', function(pin) {
      $state.go('home.pin', {pin: pin});
    });

    FileSocket.on('key.send', function(key) {

    });
  }
})();
