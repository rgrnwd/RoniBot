var assert = require('chai').assert;
var messageContent = require('../app/messageContent');

describe('MessageContent', function() {

    describe('isValid', function() {

         it('should return false when given empty json', function(){

            var response = messageContent.isValid({})
            assert.equal(false, response);
         });

         it('should return true when given valid json', function(){

            var response = messageContent.isValid({"key":"value"})
            assert.equal(true, response);
         });
    });

    describe('isSticker', function() {

         it('should return false when given content type not sticker (8=sticker)', function(){

            var response = messageContent.isSticker(7);
            assert.equal(false, response);
         });

         it('should return true when given content type sticker (8=sticker)', function(){

            var response = messageContent.isSticker(8);
            assert.equal(true, response);
         });
    });

    describe('isText', function() {

         it('should return false when given content type not text (1=text)', function(){

            var response = messageContent.isText(4);
            assert.equal(false, response);
         });

         it('should return true when given content type text (1=text)', function(){

            var response = messageContent.isText(1);
            assert.equal(true, response);
         });
    });

    describe('containsKeyword', function(){

         it('should return false when given empty content', function(){

            var response = messageContent.containsKeyword('', ['someword']);
            assert.equal(false, response);
         });

         it('should return false when given empty keywords array', function(){

            var response = messageContent.containsKeyword('someText', []);
            assert.equal(false, response);
         });

         it('should return false when text does not contain keyword', function(){

            var response = messageContent.containsKeyword('someText', ['differentText']);
            assert.equal(false, response);
         });

         it('should return false when text does not contain any of the keywords in the array', function(){

            var response = messageContent.containsKeyword('someText', ['123', '444', '555']);
            assert.equal(false, response);
         });

         it('should return true when text equals keyword', function(){

            var response = messageContent.containsKeyword('someText', ['someText']);
            assert.equal(true, response);
         });

         it('should return true when text contains keyword', function(){

            var response = messageContent.containsKeyword('someText', ['some']);
            assert.equal(true, response);
         });

         it('should return true when text contains one of given keywords', function(){

            var response = messageContent.containsKeyword('someText', ['banana', 'pineapple', 'some']);
            assert.equal(true, response);
         });

         it('should return true when text contains one of given keywords ignore case', function(){

            var response = messageContent.containsKeyword('someText', ['banana', 'pineapple', 'TEXT']);
            assert.equal(true, response);
         });

         it('should return true when text contains one of given keywords in Thai', function(){

            var response = messageContent.containsKeyword('กล้วยขนาดใหญ่', ['กล้วย', 'สัปปะรด']);
            assert.equal(true, response);
         });
    });
});