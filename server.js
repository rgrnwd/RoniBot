var bodyParser = require('body-parser');
var http = require('http');

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var config = require('./config')

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
	chatbotReply(content);

	console.log(JSON.stringify(request.body))
	//console.log(content)
	response.writeHead(200, { 'Content-Type': 'application/json' }) 
  	response.end(JSON.stringify('Hello! ' + content.content.text)) 
});

function chatbotReply(requestContent){
	console.log('chatbotReply')

	var channelId = requestContent.fromChannel
	var reply = 'Hello ' + requestContent.content.text;

	  var post_data = {
      	"to":[requestContent.from],
        'toChannel' : channelId,
        "eventType" : requestContent.eventType,
	    "content":{
		    "contentType":1,
		    "toType":1,
		    "text": reply
		  }
  		};

  // An object of options to indicate where to post to
  var post_options = {
      host: 'trialbot-api.line.me',
      port: '80',
      path: '/v1/events',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charser=UTF-8',
          'X-Line-ChannelID': config.ChannelId,
          'X-Line-ChannelSecret': config.ChannelSecret,
          'X-Line-Trusted-User-With-ACL': config.ChannelMID,
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  console.log(JSON.stringify(post_data))
  console.log(JSON.stringify(post_options))

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      })
      res.on('error', function(err){
      	console.log(err);
      })

  });

  // post the data
  post_req.write(JSON.stringify(post_data));
  post_req.end();

}

