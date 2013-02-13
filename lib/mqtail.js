var EventEmitter = require("events").EventEmitter
  , Publisher = require("./mqtail/publisher")
  , Watcher = require("./mqtail/watcher")
  , Reader = require("./mqtail/reader");

function Tail(file) {

	// All objects are loosely coupled by communicating
	// through the EventEmitter. This is but one way to
	// achieve loose coupling
	var emitter = new EventEmitter();

	// This object publishes messages to RabbitMQ
	var publisher = new Publisher(emitter);

	// This object reads the file
	var reader = new Reader(file, emitter);

	// This object watches the file
	var watcher = new Watcher(file, emitter);

	// We can do some logging as well
	emitter.on("fileread", function(data) {

		// This is where we would send the new data
		console.log("Updates read", data.trim());
	});

}

module.exports = Tail;