var http = require('http')
var url = require('url')
var port = 4444;

var server = http.createServer(callback)
server.listen(port, '127.0.0.1')
console.log('Server started. Listening on port ' + port)

function callback(request, response){
	
 	response.writeHead(200, { 'Content-Type': 'application/json' }) 
 	response.end(JSON.stringify('Hello!')) 
}
