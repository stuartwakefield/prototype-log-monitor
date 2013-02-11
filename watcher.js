var fs = require("fs")
  , EventEmitter = require("events").EventEmitter
  , path = require("path")/*
  , amqp = require("amqp")*/;

/*var conn = amqp.createConnection(
		{ host: "localhost"
		, port: 9123 }
	);

conn.on("ready", function() {
	conn.exchange("monitor", function(exchange) {
		fs.watchFile("my.log", function(curr, prev) {
			exchange.publish(null, "File changed");
		});
	});	
});*/

var emitter = new EventEmitter();

var file = path.resolve(__dirname, "my.log");

emitter.on("fileread", function(data) {

	// This is where we would send the new data
	console.log("Read", data.trim());
});

fs.open(file, "r", function(err, fd) {
	emitter.on("fileupdated", function(ev) {

		// Only read if there is more to read
		if(ev.len > 0) {

			// Create a buffer to read to
			var buffer = new Buffer(ev.len);

			// Read the file asynchronously
			fs.read(fd, buffer, 0, ev.len, ev.pos, function(err, len, buffer) {
				emitter.emit("fileread", buffer.toString("utf8"));
			});
		}
	});
});

fs.watchFile(file, function(curr, prev) {
	emitter.emit("fileupdated", {
		pos: prev.size,
		len: curr.size - prev.size
	});
});