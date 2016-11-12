(function() {
  'use strict';

  angular.module('FileSec-Configuration', [])
    .value('FIREBASE_CONFIG', {
      "apiKey": "AIzaSyDrh5EALUFONENUHG59-lk76Ww08isd2ec",
      "authDomain": "filesec-e82e5.firebaseapp.com",
      "databaseURL": "https://filesec-e82e5.firebaseio.com"
    })
    .value('SERVER_URL', 'http://557d3359.ngrok.io:80/');
})();