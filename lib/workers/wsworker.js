(function () {

  var WebSocket  = require('ws'),
      util       = require('util'),
      BaseWorker = require('./baseworker.js'),
      logger     = require('../logger.js');

  /**
   * WsWorker Worker class inherits form BaseWorker
   */
  var WsWorker = function (server, generator) {
    WsWorker.super_.apply(this, arguments);
  };

  util.inherits(WsWorker, BaseWorker);

  WsWorker.prototype.createClient = function (callback) {
    var self = this;
    var client = new WebSocket(this.server);

    client.on("open", function(){
      callback(false, client);
    });

    client.on("close", function(err){
      if (self.verbose) {
            logger.error("WsWorker connection closed" + JSON.stringify(err));
      }
      callback(true, client);
    });

    client.on("error", function(err){
      if (self.verbose) {
            logger.error("WsWorker error: " + JSON.stringify(err));
      }
      callback(true, client);
    });
  };

  WsWorker.prototype.close = function () {
    this.running = false;

    for (var i = 0; i < this.clients.length; i++) {
      try { this.clients[i].close(); } catch (err) { }
    }
  };

  module.exports = WsWorker;

})();
