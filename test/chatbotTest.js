var chatbot = require('../app/chatbot')
var assert = require('chai').assert

describe('Chatbot', function() {
    describe('reply', function() {

     it('should return -1 when receive empty json', function(){
     	var response = chatbot.reply({})
      	assert.equal(response, -1);

     });

     it('should return 0 when receive valid json', function(){
     	var validJson = {
     		'fromChannel' : 1,
     		'content' : {
     			'from' : '',
     			'text' : ''
     		}}
     	var response = chatbot.reply(validJson)
      	assert.equal(response, 0);
     });

    });
});