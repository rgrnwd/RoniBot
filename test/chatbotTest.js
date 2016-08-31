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

    function generateRequestStickerContent(){
        return{
            'fromChannel' : 1,
            'content' : {
                'from' : '',
                'contentType': 8,
			    "contentMetadata":{
			      "STKID":"3",
			      "STKPKGID":"332",
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


     it('should reply I like that sticker when receive sticker', function(){
     	
        var text = 'I like that sticker'
     	var request = new PassThrough();
		var write = sinon.spy(request, 'write');
		this.request.returns(request);
		 
     	var response = chatbot.reply(generateRequestStickerContent())
		assert(write.withArgs(JSON.stringify(generateExpectedResult(text))).calledOnce);
     });

    });
});