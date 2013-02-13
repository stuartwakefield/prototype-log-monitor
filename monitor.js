var EventEmitter = require("events").EventEmitter
  , Subscriber = require("./lib/monitor/subscriber")
  , Server = require("./lib/monitor/server");

var host = "127.0.0.1";
var port = 8080;

// Systems will be connected through events
var emitter = new EventEmitter();
var subscriber = new Subscriber(host, emitter);
var server = new Server(port, emitter);