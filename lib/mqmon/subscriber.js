var ampq = require("amqp");

function Subscriber(host, emitter) {

	console.log("Connecting to AMQP server");

	// Create a connection to the message queue
	var conn = ampq.createConnection(
			{ host: host }
		);

	conn.on("ready", function() {

		console.log("Connected to AMQP server");

		console.log("Creating a queue");

		conn.queue("", function(queue) {

			console.log("Queue created " + queue.name);

			queue.subscribe(function(msg) {

				console.log("Received message to queue");

				emitter.emit("update", msg.body);
			});

			console.log("Binding queue to exchange");

			queue.bind("monitor", "");

			queue.on("queueBindOk", function() {
				console.log("Queue is bound to exchange ");
			});
		});
	});

}

module.exports = Subscriber;