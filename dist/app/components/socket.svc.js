(function() {
  'use strict';

  angular.module('FileSec-Utilities')
  .service('FileSocket', ['SERVER_URL', 'socketFactory', FileSocket]);

  function FileSocket(SERVER_URL, socketFactory) {
    var fileSocket = io.connect(SERVER_URL);

    fileSocket = socketFactory({
      ioSocket: fileSocket
    });

    return fileSocket;
  }
})();