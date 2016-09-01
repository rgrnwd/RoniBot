module.exports = {
  reply : reply
}

var http = require('https');
var LINEEvent = require('./LINEEvent')
var messageContent = require('./messageContent')

function reply(requestContent){

  if(!messageContent.isValid(requestContent)){
    return -1;
  }

  var request = http.request(LINEEvent.postRequestOptions(), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + JSON.stringify(chunk));
      })
      res.on('error', function(err){
        console.error('Error: ', err);
      })

  });

  request.write(generateBotReply(requestContent.content));
  request.end();

  return 0;
}

function generateBotReply(content){

  var jsonReply = "";

  if (returnSticker(content)){
    jsonReply = LINEEvent.newStickerMessage([content.from]);
  }
  else{
    jsonReply = LINEEvent.newTextMessage([content.from], getBotReplyMessage(content));
  }

  return JSON.stringify(jsonReply);
}

function getBotReplyMessage(content){

  var reply = "I don't know"

  if(messageContent.isText(content.contentType)){

    if(messageContent.containsKeyword(content.text, ["account balance","ยอด"])){
      reply = "You have 50,000,000 baht"
    }
    else{
      reply = 'Hello ' + content.text
    }
  }
  else if(messageContent.isSticker(content.contentType)){
    reply = stickerStandardReply(content.contentMetadata.STKID);
  }

  return reply
}

function returnSticker(content){

  return messageContent.isText(content.contentType) && 
         messageContent.containsKeyword(content.text, ["sticker"]);
}

function stickerStandardReply(stickerId){

  var stickerReplies = { "4": "You know I can't resist that look...",
                         "13" : "I don't trust that...",
                         "2" : "What are you smiling at?",
                         "10" : "What have you been up to??"}

  var reply = stickerReplies[stickerId];
  if (!reply)
    reply = 'I like that sticker';

    return reply;
}

