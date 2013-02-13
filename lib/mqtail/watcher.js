var fs = require("fs");

function Watcher(file, emitter) {

	console.log("Watching file: " + file);

	fs.watchFile(file, function(curr, prev) {

		console.log("File updated!");

		emitter.emit("fileupdated", {
			pos: prev.size,
			len: curr.size - prev.size
		});
	});

}

module.exports = Watcher;