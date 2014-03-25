(function () {

  var SockJS     = require('sockjs-client-node'),
      util       = require('util'),
      BaseWorker = require('./baseworker.js'),
      logger     = require('../logger.js');

  /**
   * SockJSWorker Worker class inherits form BaseWorker
   */
  var SockJSWorker = function (server, generator) {
    SockJSWorker.super_.apply(this, arguments);
  };

  util.inherits(SockJSWorker, BaseWorker);

  SockJSWorker.prototype.createClient = function (callback) {
    var self = this;
    var client = new SockJS(this.server);

    client.onopen = function(){
      callback(false, client);
    };

    client.onclose = function(err){
      if (self.verbose) {
            logger.error("SockJSWorker connection closed" + JSON.stringify(err));
      }
      callback(true, client);
    };

    client.error = function(err){
      if (self.verbose) {
            logger.error("SockJSWorker error: " + JSON.stringify(err));
      }
      callback(true, client);
    };
  };

  module.exports = SockJSWorker;

})();
