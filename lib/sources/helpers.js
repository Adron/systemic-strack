/**
 * Created by Adron on 11/24/15.
 */

var helpers = {};
var statusMessage = '';

helpers.infoContentWrite = function infoContentWrite (infoContent, clear) {
  if(clear){
    statusMessage = infoContent
  } else {
    statusMessage += infoContent
  }
  console.log(infoContent);
  return statusMessage;
}

module.exports = helpers;