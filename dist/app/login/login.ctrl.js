(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('LoginController', ['$scope', 'FirebaseService', LoginController]);

  function LoginController($scope, FirebaseService) {
    $scope.name = "FileSec-Desktop";
  }
})();
