var fs = require("fs");

function Reader(file, emitter) {

	fs.open(file, "r", function(err, fd) {
		emitter.on("fileupdated", function(ev) {

			console.log("Reading updates");

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

}

module.exports = Reader;