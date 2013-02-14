var EventEmitter = require("events").EventEmitter
  , Subscriber = require("./mqmon/subscriber")
  , Server = require("./mqmon/server");

function Monitor(host, port) {
	
	// Systems will be connected through events
	var emitter = new EventEmitter();
	var subscriber = new Subscriber(host, emitter);
	var server = new Server(port, emitter);
}

module.exports = Monitor;