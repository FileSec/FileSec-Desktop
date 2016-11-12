(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('PinController', ['$scope', '$state', '$stateParams', PinController]);

  function PinController($scope, $state, $stateParams) {
    $scope.pin = $stateParams.pin;    
  }
})();
