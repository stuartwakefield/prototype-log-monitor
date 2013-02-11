var WebSocketServer = require("websocket").server
  , http = require("http")
  , ampq = require("amqp");

var server = http.createServer(function(req, res) {
	res.writeHead(404);
	res.end();
});
server.listen(8080);

var conn = ampq.createConnection(
		{ host: "localhost"
		, port: 9132 }
	);

var updates = new EventEmitter();

var websocket = new WebSocketServer({
	httpServer: server,
	autoAcceptConnection: false
});

websocket.on("request", function(req) {

	var conn = req.accept("echo-protocol", req.origin);

	var receive = function(msg) {
		conn.send(msg);
	};

	updates.on("update", receive);

	conn.on("message", function(msg) {
		// Do nothing
	});

	conn.on("close", function(code, desc) {
		updates.removeListener("update", receive);
	});

});

conn.on("ready", function() {
	conn.queue(null, function(queue) {

		queue.subscribe(function(msg) {
			updates.emit("update", msg);
		});

		queue.bind("monitor");
	});
})