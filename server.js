var bodyParser = require('body-parser');
// var url = require('url')
// var port = 4444;

// var server = http.createServer(callback)
// server.listen(process.env.PORT || port, function(){
// 	console.log('Server started. Listening on port ' + port)
// })

// function callback(request, response){

// 	var urlData = url.parse(request.url, true)  
// 	var message = urlData.query.message

// 	console.log("Receive request. Message: " + message)
//  	response.writeHead(200, { 'Content-Type': 'application/json' }) 
//  	response.end(JSON.stringify('Hello! ' + message)) 
// }

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4444));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
extended: true
}));

app.post('/callback', function(request, response) {
	console.log(request.body)
	response.writeHead(200, { 'Content-Type': 'application/json' }) 
  	response.end(JSON.stringify('Hello! ' )) 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


