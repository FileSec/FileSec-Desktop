(function() {
  'use strict';

  angular.module('FileSec-Utilities')
  .service('UploadService', ['$q', '$crypto', '$window', 'FileSocket', 'FileReader', UploadService]);

  function UploadService($q, $crypto, $window, FileSocket, FileReader) {
    var service = {};

    var file = undefined;
    var encrypt = true;

    var fs = $window.fs;

    service.authenticated = false;

    service.authenticate = function() {
      if(service.authenticated) {
        return;
      }

      var user = firebase.auth().currentUser;
      if(user === null) {
        //Redirect back to login page
        return false;
      }

      var authValue = {
        deviceType: "computer",
        userID: user.uid
      }
      console.log('Authenticated');
      FileSocket.emit('user.auth', authValue);
      return true;
    }

    service.newFile = function(_file, _encrypt) {
      file = _file;
      encrypt = _encrypt; 
    }

    service.useKey = function(key, $scope) {
      var q = $q.defer();
      console.log(key);
      console.log(file);

      FileReader.readAsDataURL(file, $scope)
      .then(function(res) {
        console.log('res', res);
        var data = res.replace(/^[^,]*,/, '');
        var buffer = new Buffer(data, 'base64').toString('ascii');

        var encData;
        if(encrypt) {
          console.log('buffer', buffer);
          encData = $crypto.encrypt(buffer, key.toString());
        }
        else {
          encData = $crypto.decrypt(buffer, key.toString());

          if(encData.length === 0) {
            return q.reject("Could not decrypt the file");
          }
        }

        fs.writeFile(file.path, encData.toString('base64'), function(err) {
          if (err) return q.reject(err);
          q.resolve();
        });
      })
      .catch(function(err) {
        q.reject(err);
      });

      return q.promise;
    }

    FileSocket.on('file.info', function() {
      sendInfo();
    });

    return service;
  }
})();