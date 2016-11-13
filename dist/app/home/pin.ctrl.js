(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('PinController', ['$scope', '$state', '$stateParams', 'FileSocket', 'UploadService', PinController]);

  function PinController($scope, $state, $stateParams, FileSocket, UploadService) {
    $scope.pin = $stateParams.pin;

    FileSocket.on('key.send', function(key) {
      console.log("Acquired encryption key", key);
      UploadService.useKey(key, $scope)
      .then(function() {
        $state.go('home');
      })
      .catch(function(err) {
        console.error(err);
      });
    });
  }
})();
