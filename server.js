var http = require('http')
var url = require('url')
var port = 4444;

var server = http.createServer(callback)
server.listen(process.env.PORT || port, function(){
	console.log('Server started. Listening on port ' + port)
})

function callback(request, response){

	console.log("Receive request : "+request)
 	response.writeHead(200, { 'Content-Type': 'application/json' }) 
 	response.end(JSON.stringify('Hello!')) 
}
