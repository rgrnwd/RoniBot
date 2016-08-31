var http = require('http')
var url = require('url')
var port = 4444;

var server = http.createServer(callback)
server.listen(process.env.PORT || port, function(){
	console.log('Server started. Listening on port ' + port)
})

function callback(request, response){

	var urlData = url.parse(request.url, true)  
	var message = new Date(urlData.query.message)

	console.log("Receive request. Message: " + message)
 	response.writeHead(200, { 'Content-Type': 'application/json' }) 
 	response.end(JSON.stringify('Hello! ' + message)) 
}
