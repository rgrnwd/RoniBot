module.exports = {
  reply : reply
}

var http = require('https');
var config = require('../config')

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function generateReplyMessage(content){

  var reply = "I don't know"

  if(content.contentType == 1){

    if(content.text.indexOf("account balance") > -1 || content.text.indexOf("ยอด") > -1){
      reply = "You have 50,000,000 baht"
    }
    else{
      reply = 'Hello ' + content.text
    }
  }
  else if(content.contentType == 8){
    switch (content.contentMetadata.STKID){
      case "4":
        reply = "You know I can't resist that look..."
        break;
      case "13":
        reply = "YEAH RIGHT!";
        break;
      case "2":
        reply = "What are you smiling at?";
        break;
      case "10":
        reply = "What have you been up to??";
        break;
      default:
        reply = 'I like that sticker'
        break;
    }
  }

  return reply
}

function generateReply(content){

  if(content.contentType == 1 && content.text.indexOf("sticker") > -1){
    return {
        "to":[content.from],
        'toChannel' : 1383378250,
        "eventType" : "138311608800106203",
        "content":{
          'contentType': 8,
          "contentMetadata":{
            "STKID": "3",
            "STKPKGID":"1",
            "STKVER":"100"
          },
          "toType":1
        }
      };
  }
  
  return {
        "to":[content.from],
        'toChannel' : 1383378250,
        "eventType" : "138311608800106203",
        "content":{
          "contentType":1,
          "toType":1,
          "text": generateReplyMessage(content)
        }
      };

}

function reply(requestContent){

  if(isEmptyObject(requestContent)){
    return -1;
  }

  var channelId = requestContent.fromChannel

  var post_data = generateReply(requestContent.content)

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