module.exports = {
    generateTextRequest : generateRequestTextContent,
    generateStickerRequest : generateRequestStickerContent
}
function generateRequestTextContent(text){
    return {
        'fromChannel' : 1,
        'content' : {
            'from' : '',
            'text' : text,
            'contentType': 1,
        }}
}

function generateRequestStickerContent(stickerId){
    return{
        'fromChannel' : 1,
        'content' : {
            'from' : '',
            'contentType': 8,
		    "contentMetadata":{
              "STKID": stickerId,
		      "STKTXT": 'SomeText',
		      "STKPKGID":"1",
		      "STKVER":"100"
		    }
        }}
}