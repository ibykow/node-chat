var net = require('net')
	,	rl = require('readline')
	, readline_interface = rl.createInterface(process.stdin, process.stdout)
	, username = 'Mami'
	,	client = 0;

console.log("Please enter your name");
	
readline_interface.on('line', function(line) {
  if(client) { client.write(username + ' says: ' + line); } else { username = line; connect(); }
	readline_interface.setPrompt(username, username.length + 1);
  readline_interface.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
	
var connect = function() {
	client = net.connect(8124, "192.168.1.66", function() { //'connect' listener
		console.log('connected to chat server');
	}).on('connect', function() {
		this.write(username + ' connected');
	}).on('data', function(data) {
		console.log(data.toString());
	}).on('end', function() {
		console.log('client disconnected');
	});
}