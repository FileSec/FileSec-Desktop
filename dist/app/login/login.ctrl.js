(function() {
  'use strict';

  angular.module('FileSec-Home').
  controller('LoginController', ['$scope', '$state', 'FirebaseService', LoginController]);

  function LoginController($scope, $state, FirebaseService) {
    $scope.name = "FileSec-Desktop";
    $scope.loginCreds = {
      email: "redbackthomson@gmail.com",
      password: "password"
    };

    $scope.login = function() {
      firebase.auth().signInWithEmailAndPassword($scope.loginCreds.email, $scope.loginCreds.password)
      .then(function(user) {
        console.log("Signed in!");
        $state.go('home');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.error(error);
      });
    };
  }
})();
