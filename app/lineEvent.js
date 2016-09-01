module.exports = {
  newStickerMessage : newStickerMessage,
  newTextMessage : newTextMessage
}
function newStickerMessage(recipients){
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

function newTextMessage(recipients, content){
  return {
    "to":recipients,
    'toChannel' : 1383378250,
    "eventType" : "138311608800106203",
    "content":{
      "contentType":1,
      "toType":1,
      "text": content
    }
  };
}