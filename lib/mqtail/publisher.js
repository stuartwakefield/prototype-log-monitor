var amqp = require("amqp");

function Publisher(emitter) {

	console.log("Connecting to AMQP server...");

	var conn = amqp.createConnection(
			{ host: "localhost" }
		);

	conn.on("ready", function() {

		console.log("Connected to AMQP server!");

		var exchangeName = "monitor";

		console.log("Creating exchange '" + exchangeName + "'...");

		conn.exchange(exchangeName, { 
			type: "fanout",
			durable: false
		}, function(exchange) {

			console.log("Exchange '" + exchange.name + "' created!");

			emitter.on("fileread", function(data) {

				console.log("Publishing data through exchange:", data.trim());

				exchange.publish("", {
					body: data.trim()
				});

			});
		});	
	});

}

module.exports = Publisher;