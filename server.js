var http = require('http')
var url = require('url')

var server = http.createServer(callback)
server.listen(4444, '127.0.0.1')


function callback(request, response){
	
 	response.writeHead(200, { 'Content-Type': 'application/json' }) 
 	response.end(JSON.stringify('Hello!')) 
}
