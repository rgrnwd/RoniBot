var http = require('https');
var chatbot = require('../app/chatbot')
var assert = require('chai').assert
var sinon = require('sinon')
var PassThrough = require('stream').PassThrough;

describe('Chatbot', function() {

	var server

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
     	var validJson = {
     		'fromChannel' : 1,
     		'content' : {
     			'from' : '',
     			'text' : 'John'
     		}}
     	
     	var expected = {
		    "to":[''],
		    'toChannel' : 1383378250,
		    "eventType" : "138311608800106203",
		    "content":{
			    "contentType":1,
			    "toType":1,
			    "text": 'Hello John'
			    }
		};

     	var request = new PassThrough();
		var write = sinon.spy(request, 'write');
		this.request.returns(request);
		 
     	var response = chatbot.reply(validJson)
		assert(write.withArgs(JSON.stringify(expected)).calledOnce);
     });

    });
});