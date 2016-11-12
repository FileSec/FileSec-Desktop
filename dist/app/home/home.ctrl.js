(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('HomeController', ['$scope', 'FirebaseService', HomeController]);

  function HomeController($scope, FirebaseService) {
    $scope.name = "FileSec-Desktop";
  }
})();
