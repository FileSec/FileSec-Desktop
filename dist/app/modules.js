(function() {
  //Service Modules
  angular.module('FileSec-Utilities', ['FileSec-Configuration', 'mdo-angular-cryptography', 'filereader'])
  .config(['$cryptoProvider', function($cryptoProvider){
    $cryptoProvider.setCryptographyKey('ABCD123');
  }]);

  //Controller Modules
  angular.module('FileSec-Home', ['FileSec-Utilities', 'angular-md5', 'btford.socket-io']);

  angular.module('FileSec', ['FileSec-Home', 'ui.router'])
  .config(config);

  config.$inject = ['$urlRouterProvider', '$stateProvider'];
  function config($urlRouterProvider, $stateProvider)
  {
      $urlRouterProvider.otherwise('/login');

      $stateProvider
      .state({
          name: 'home',
          url: '/home',
          controller: 'HomeController',
          templateUrl: 'partials/home.html'
      })
      .state({
          name: 'pin',
          url: '/pin',
          controller: 'PinController',
          params: {pin: null},
          templateUrl: 'partials/pin.html'
      })
      .state({
          name: 'login',
          url: '/login',
          controller: 'LoginController',
          templateUrl: 'partials/login.html'
      })
      .state("otherwise", {
        redirectTo: '/login'
      });
  }
})();