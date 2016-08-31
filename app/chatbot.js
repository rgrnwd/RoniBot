module.exports = {
  reply : reply
}

var http = require('https');
var config = require('../config')

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function reply(requestContent){

  if(isEmptyObject(requestContent)){
    return -1;
  }

  var channelId = requestContent.fromChannel
  var reply = 'Hello ' + requestContent.content.text;

  var post_data = {
        "to":[requestContent.content.from],
        'toChannel' : 1383378250,
        "eventType" : "138311608800106203",
      "content":{
        "contentType":1,
        "toType":1,
        "text": reply
      }
      };

  // An object of options to indicate where to post to
  var post_options = {
      host: 'trialbot-api.line.me',
      port: '443',
      path: '/v1/events',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charser=UTF-8',
          'X-Line-ChannelID': config.ChannelId,
          'X-Line-ChannelSecret': config.ChannelSecret,
          'X-Line-Trusted-User-With-ACL': config.ChannelMID
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + JSON.stringify(chunk));
      })
      res.on('error', function(err){
        console.log('Error: ', err);
      })

  });

  // post the data
  post_req.write(JSON.stringify(post_data));
  post_req.end();

  return 0;

}