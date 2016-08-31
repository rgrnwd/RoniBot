var http = require('https');
var chatbot = require('../app/chatbot')
var assert = require('chai').assert
var sinon = require('sinon')
var PassThrough = require('stream').PassThrough;

describe('Chatbot', function() {

	var server

    function generateRequestTextContent(text){
        return{
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

        return {
            "to":[''],
            'toChannel' : 1383378250,
            "eventType" : "138311608800106203",
            "content":{
                "contentType":1,
                "toType":1,
                "text": text
                }
        };
    }

	beforeEach(function() {
    	this.request = sinon.stub(http, 'request');
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
     	var request = new PassThrough();
		var write = sinon.spy(request, 'write');
		this.request.returns(request);
		 
     	var response = chatbot.reply(generateRequestTextContent(text))
		assert(write.withArgs(JSON.stringify(generateExpectedResult('Hello '+text))).calledOnce);
     });


     it('should reply I like that sticker when receiving unknown sticker', function(){
     	
        var text = 'I like that sticker'
     	var request = new PassThrough();
		var write = sinon.spy(request, 'write');
		this.request.returns(request);
		 
     	var response = chatbot.reply(generateRequestStickerContent(123))
		assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });

     it('should send specific reply when receive first recognised sticker', function(){
        
        var text = "You know I can't resist that look..."
        var request = new PassThrough();
        var write = sinon.spy(request, 'write');
        this.request.returns(request);
         
        var response = chatbot.reply(generateRequestStickerContent("4"))
        assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });

     it('should send different reply when receive second recognised sticker', function(){
        
        var text = "YEAH RIGHT!"
        var request = new PassThrough();
        var write = sinon.spy(request, 'write');
        this.request.returns(request);
         
        var response = chatbot.reply(generateRequestStickerContent("13"))
        assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });


     it('should send different reply when receive second recognised sticker', function(){
        
        var text = "What are you smiling at?"
        var request = new PassThrough();
        var write = sinon.spy(request, 'write');
        this.request.returns(request);
         
        var response = chatbot.reply(generateRequestStickerContent("2"))
        assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });


     it('should send different reply when receive second recognised sticker', function(){
        
        var text = "What have you been up to??"
        var request = new PassThrough();
        var write = sinon.spy(request, 'write');
        this.request.returns(request);
         
        var response = chatbot.reply(generateRequestStickerContent("10"))
        assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });

    });
});