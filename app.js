var net = require('net'), connections = [];

var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
	connections.push(c);
	c.on('data', function(data) {
		console.log(data.toString());
		for(var i in connections) if(connections[i] != c) connections[i].write(data.toString());
	});
  c.on('end', function() {
		connections.pop(c);
    console.log('server disconnected');
  }); 

});
server.listen(8124, "192.168.1.66", function() { //'listening' listener
  console.log('server bound');
});