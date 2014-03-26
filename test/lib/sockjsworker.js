/*global require, describe, it, beforeEach, afterEach*/

var mocha        = require('mocha'),
    chai         = require('chai'),
    assert       = chai.assert,
    should       = chai.should(),
    sinon        = require('sinon'),
    http         = require('http'),
    sockjsServer = require('sockjs'),
    SockJS       = require('sockjs-client-node');

var Benchmark    = require('../../lib/benchmark.js'),
    SockJSWorker = require('../../lib/workers/sockjsworker.js'),
    BaseWorker   = require('../../lib/workers/baseworker.js')
    ;

var port      = 3337,
    benchmark = null,
    testReporter,
    server    = null;

describe('SockJSWorker', function () {
  beforeEach(function () {
    var sockserver = sockjsServer.createServer();
    server = http.createServer();
    sockserver.installHandlers(server);
    server.listen(port, '0.0.0.0');
  });
  afterEach(function () {
    server.close();
  });

  it('Should be an instance of base worker', function () {
    var worker = new SockJSWorker("http://0.0.0.0:3337/", {});
    worker.should.be.instanceof(BaseWorker);
  });

  it('create a sockjs client', function (done) {
    var worker = new SockJSWorker("http://0.0.0.0:3337/", {});
    worker.createClient(function (err, client) {
      // client.should.be.instanceof(SockJS); //Uncaught TypeError: Cannot read property 'be' of undefined
      assert((client instanceof SockJS),true);
      done();
    });
  });
});
