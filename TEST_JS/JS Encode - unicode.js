var str = "HELLO WORLD";
var unicodeStr = toUnicode(str);

//String to Unicode
document.write( unicodeStr );

//Separator
document.write( "<hr/>" );

//Unicode to String
arrayStr = unicodeStr.split("\\u");
for(var i=0; i<arrayStr.length; i++){
  document.write( String.fromCharCode( parseInt(arrayStr[i], 16)) );
}






function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}