module.exports = {
    textResult:generateExpectedResult,
    stickerResult:generateExpectedStickerResult
}
    function generateExpectedResult(text){

        return JSON.stringify({
            "to":[''],
            'toChannel' : 1383378250,
            "eventType" : "138311608800106203",
            "content":{
                "contentType":1,
                "toType":1,
                "text": text
                }
        });
    }

    function generateExpectedStickerResult(){

    	return JSON.stringify({
            "to":[''],
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
        });
    }