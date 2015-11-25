/**
 * Created by Adron on 11/24/15.
 * Description: Helper functions.
 */

var helpers = {};

var uuid = require('node-uuid');
var cloudsConfig = require('../../clouds.json');
var statusMessage = '';

if (!Date.now) {
  Date.now = function() {
    return new Date().getTime();
  }
}

helpers.getStamp = function () {
  return Date.now();
};

helpers.getUuid = function () {
  return uuid.v4();
};

helpers.infoContentWrite = function infoContentWrite (infoContent, clear) {
  if(clear){
    statusMessage = infoContent
  } else {
    statusMessage += infoContent
  }
  console.log(infoContent);
  return statusMessage;
};

helpers.getProjectRepoUrls = function (projects, optionsUrl) {
  var builtUrls = [];
  for (var i = 0; i < projects.length; i++) {
    var currentUrl = optionsUrl;
    var formedUrl = currentUrl + projects[i].key + cloudsConfig.stash.path.repositories;
    builtUrls.push(formedUrl);
  }
  return builtUrls;
};

module.exports = helpers;