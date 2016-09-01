var http = require('https');
var chatbot = require('../app/chatbot')
var assert = require('chai').assert
var sinon = require('sinon')
var PassThrough = require('stream').PassThrough;

describe('Chatbot', function() {

	var server

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

    var write

	beforeEach(function() {
    	this.request = sinon.stub(http, 'request');
     	var request = new PassThrough();
		write = sinon.spy(request, 'write');
		this.request.returns(request);
    });

    afterEach(function() {
        http.request.restore();
    });

    describe('reply', function() {

     it('should return -1 when receive empty json', function(){

     	var response = chatbot.reply({})
      	assert.equal(response, -1);
     });

     it('should reply Hello John when receive valid json with text John', function(){
     	
        var text = 'John'
		 
     	var response = chatbot.reply(generateRequestTextContent(text))
		assert(write.withArgs(generateExpectedResult('Hello '+text)).calledOnce);
     });


     it('should reply I like that sticker when receiving unknown sticker', function(){
     	
        var text = 'I like that sticker'
		 
     	var response = chatbot.reply(generateRequestStickerContent(123))
		assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });

     it('should send specific reply when receive first recognised sticker', function(){
        
        var text = "You know I can't resist that look..."

        var response = chatbot.reply(generateRequestStickerContent("4"))
        assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });

     it('should send different reply when receive second recognised sticker', function(){
        
        var text = "I don't trust that..."

        var response = chatbot.reply(generateRequestStickerContent("13"))
        assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });


     it('should send different reply when receive third recognised sticker', function(){
        
        var text = "What are you smiling at?"
         
        var response = chatbot.reply(generateRequestStickerContent("2"))
        assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });


     it('should send different reply when receive fourth recognised sticker', function(){
        
        var text = "What have you been up to??"
         
        var response = chatbot.reply(generateRequestStickerContent("10"))
        assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });

     it('should return sticker when receive a message containing sticker', function(){
         
        var response = chatbot.reply(generateRequestTextContent("give me a sticker now!!!"))
        assert(write.withArgs(generateExpectedStickerResult()).calledOnce);
     });

    it('should return account balance when message containing account balance', function(){
        
        var text = "You have 50,000,000 baht"

        var response = chatbot.reply(generateRequestTextContent("give me a my account balance"))
        assert(write.withArgs(generateExpectedResult(text)).calledOnce);
     });

    });
});