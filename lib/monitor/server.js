var http = require("http")
  , WebSocketServer = require("websocket").server;

function Server(port, emitter) {

	console.log("Creating HTTP server to handle protocol upgrade");

	// Create a HTTP server to switch up to Web Sockets
	var server = http.createServer(function(req, res) {
		res.writeHead(404);
		res.end();
	});
	server.listen(port);

	console.log("Server listening on port " + port);

	console.log("Creating Web Socket server");

	// Create a Web Socket server to upgrade from HTTP
	var websocket = new WebSocketServer({
		httpServer: server,
		autoAcceptConnection: false
	});

	websocket.on("request", function(req) {

		console.log("Received client, upgrading");

		var conn = req.accept("echo-protocol", req.origin);

		var receive = function(msg) {

			console.log("Message received from queue " + msg);

			conn.send(msg);
		};

		emitter.on("update", receive);

		conn.on("message", function(msg) {
			// Do nothing
			console.log("Unexpected message from client");
		});

		conn.on("close", function(code, desc) {

			console.log("Client has gone away!");

			emitter.removeListener("update", receive);
		});

	});

}

module.exports = Server;