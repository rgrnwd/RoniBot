var bodyParser = require('body-parser');
var config = require('./config')
var chatbot = require('./app/chatbot')
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

// app.set('port', (process.env.PORT || port));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});


app.get('/', function(request, response) {
	console.log('get received');
    response.render('index');
});

app.post('/callback', function(request, response) {

	var content = request.body.result[0]
	chatbot.reply(content);

	response.writeHead(200, { 'Content-Type': 'application/json' }) 
  	response.end(JSON.stringify('Hello! ' + content.content.text)) 
});

