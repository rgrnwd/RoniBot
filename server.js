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
var port = process.env.PORT || 8080;

app.set('port', (process.env.PORT || port));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
extended: true
}));

app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.post('/callback', function(request, response) {

	var text = request.body.result[0].content.text

	console.log(text)
	response.writeHead(200, { 'Content-Type': 'application/json' }) 
  	response.end(JSON.stringify('Hello! ' + text)) 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


