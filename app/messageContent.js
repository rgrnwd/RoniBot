module.exports = {
  containsKeyword:containsKeyword,
  isSticker:isContentTypeSticker,
  isText:isContentTypeText,
  isValid:isValid
}
function containsKeyword(content, keywords){
  var keywordFound = false;
  keywords.forEach(function(keyword){
      if (content.indexOf(keyword) > -1){
        keywordFound = true;
      }
    });
  return keywordFound;
}
function isValid(object) {
  return !Object.keys(object).length;
}
function isContentTypeSticker(contentType){
  return contentType == 8;
}
function isContentTypeText(contentType){
  return contentType == 1;
}
