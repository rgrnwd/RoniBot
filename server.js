var http = require('http')
var url = require('url')

var server = http.createServer(callback)
server.listen(process.argv[2])


function callback(request, response){
	
 	response.writeHead(200, { 'Content-Type': 'application/json' }) 
 	response.end(JSON.stringify('Hello!')) 
}
