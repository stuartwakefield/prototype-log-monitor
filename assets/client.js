var logs = document.getElementById("logs");
var view = document.getElementById("view");
var error = document.getElementById("error");

/* This function that will connect to the
 * Web Socket server, it is defined and 
 * called immediately */
(function setup() {

	var ws = new WebSocket("ws://" + window.location.host + ":8080", "echo-protocol");

	ws.onopen = function(ev) {
		document.body.setAttribute("class", "open");
	};
	
	ws.onclose = function(ev) {
		document.body.setAttribute("class", "error");
		error.textContent = "Disconnected";
	};

	ws.onmessage = function(ev) {

		var lines = ev.data.split(/\n/);
		var fragment = document.createDocumentFragment();
		lines.reverse();

		for(var i = 0; i < lines.length; ++i) {
			var pre = document.createElement("pre");
			
			pre.textContent = lines[i];
			
			fragment.appendChild(pre);
		}
		
		logs.insertBefore(fragment, logs.firstChild);

	};

})();

/* Also allow setup to be called through 
 * the reconnect button */
var reconnect = document.getElementById("reconnect");
reconnect.addEventListener("click", setup, false);
