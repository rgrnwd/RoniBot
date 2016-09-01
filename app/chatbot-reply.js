module.exports = {
  generateSticker : generateStickerReply,
  generateText : generateTextReply
}
function generateStickerReply(recipients){
  return {
    "to":recipients,
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

function generateTextReply(recipients, message){
  return {
    "to":recipients,
    'toChannel' : 1383378250,
    "eventType" : "138311608800106203",
    "content":{
      "contentType":1,
      "toType":1,
      "text": message
    }
  };
}