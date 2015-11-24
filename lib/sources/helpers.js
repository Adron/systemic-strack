/**
 * Created by Adron on 11/24/15.
 * Description: Helper functions.
 */

var helpers = {};

var uuid = require('node-uuid');
var statusMessage = '';

if (!Date.now) {
  Date.now = function() {
    return new Date().getTime();
  }
}

helpers.getStamp = function () {
  return Date.now();
}

helpers.getUuid = function () {
  return uuid.v4();
}

helpers.infoContentWrite = function infoContentWrite (infoContent, clear) {
  if(clear){
    statusMessage = infoContent
  } else {
    statusMessage += infoContent
  }
  console.log(infoContent);
  return statusMessage;
}

helpers.getProjectRepoUrls = function (body) {
  var projects = JSON.parse(body).values;
  var projectRepos = makeRepositoryUrls(projects);
  return projectRepos;
}

module.exports = helpers;