(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('HomeController', ['$scope', 'FirebaseService', HomeController]);

  function HomeController($scope, FirebaseService) {
    $scope.upload = function() {
      var file = document.getElementById('fileUpload').files[0];
      //Begin sending the file
    }
  }
})();
