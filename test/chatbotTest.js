var http = require('https');
var assert = require('chai').assert;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;

var chatbot = require('../app/chatbot');
var request = require('./testSetup/request');
var expectedResult = require('./testSetup/expectedResult');

describe('Chatbot', function() {

    var write;

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
		 
     	var response = chatbot.reply(request.generateTextRequest(text))
		assert(write.withArgs(expectedResult.textResult('Hello '+text)).calledOnce);
     });


     it('should reply I like that sticker when receiving unknown sticker', function(){
     	
        var text = 'I like that sticker'
		 
     	var response = chatbot.reply(request.generateStickerRequest(123))
		assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });

     it('should send specific reply when receive first recognised sticker', function(){
        
        var text = "You know I can't resist that look..."

        var response = chatbot.reply(request.generateStickerRequest("4"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });

     it('should send different reply when receive second recognised sticker', function(){
        
        var text = "I don't trust that..."

        var response = chatbot.reply(request.generateStickerRequest("13"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });


     it('should send different reply when receive third recognised sticker', function(){
        
        var text = "What are you smiling at?"
         
        var response = chatbot.reply(request.generateStickerRequest("2"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });


     it('should send different reply when receive fourth recognised sticker', function(){
        
        var text = "What have you been up to??"
         
        var response = chatbot.reply(request.generateStickerRequest("10"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });

     it('should return sticker when receive a message containing sticker', function(){
         
        var response = chatbot.reply(request.generateTextRequest("give me a sticker now!!!"))
        assert(write.withArgs(expectedResult.stickerResult()).calledOnce);
     });

    it('should return account balance when message containing account balance in English', function(){
        
        var text = "You have 50,000,000 baht"

        var response = chatbot.reply(request.generateTextRequest("give me a my account balance"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });

    it('should return account balance when message containing account balance in Thai', function(){
        
        var text = "You have 50,000,000 baht"

        var response = chatbot.reply(request.generateTextRequest("ยอดยอด"))
        assert(write.withArgs(expectedResult.textResult(text)).calledOnce);
     });

    });
});