module.exports = {
  reply : reply
}

var http = require('https');
var config = require('../config')
var reply = require('../app/chatbot-reply')

function reply(requestContent){

  if(isValid(requestContent)){
    return -1;
  }

  var request = http.request(postRequestOptions(), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + JSON.stringify(chunk));
      })
      res.on('error', function(err){
        console.error('Error: ', err);
      })

  });

  request.write(JSON.stringify(generateReply(requestContent.content)));
  request.end();

  return 0;
}

function determineReplyMessage(content){

  var reply = "I don't know"

  if(isContentTypeText(content.contentType)){

    if(findKeyword(content.text, ["account balance","ยอด"])){
      reply = "You have 50,000,000 baht"
    }
    else{
      reply = 'Hello ' + content.text
    }
  }
  else if(isContentTypeSticker(content.contentType)){
    reply = stickerStandardReply(content.contentMetadata.STKID);
  }

  return reply
}

function isValid(object) {
  return !Object.keys(object).length;
}

function returnSticker(content){
  return isContentTypeText(content.contentType) && content.text.indexOf("sticker") > -1;
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

function findKeyword(content, keywords){
  var keywordFound = false;
  keywords.forEach(function(keyword){
      if (content.indexOf(keyword) > -1){
        keywordFound = true;
      }
    });
  return keywordFound;
}
function isContentTypeSticker(contentType){
  return contentType == 8;
}
function isContentTypeText(contentType){
  return contentType == 1;
}

function postRequestOptions(){
  return {
    host: config.LineAPI,
    port: config.LineAPIPort,
    path: config.LineAPIPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charser=UTF-8',
      'X-Line-ChannelID': config.ChannelId,
      'X-Line-ChannelSecret': config.ChannelSecret,
      'X-Line-Trusted-User-With-ACL': config.ChannelMID
    }
  };
}
function generateReply(content){

  if (returnSticker(content)){
    return reply.generateSticker([content.from]);
  }
  else{
    return reply.generateText([content.from], determineReplyMessage(content));
  }
}
