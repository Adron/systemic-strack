#!/usr/bin/env node

var stashScm = {};

var request = require('request');
var cloudsConfig = require('../../clouds.json');
var host = 'http://' + cloudsConfig.stash.host;
var pathProjects = cloudsConfig.stash.path.projects;

var options = {
  url: '',
  headers: {
    'host': cloudsConfig.stash.host,
    'path': '',
    'accept': '*/*',
    'content-type': 'application/json',
    "connection": "keep-alive",
    "Authorization": process.env.AUTH
  }
};

stashScm.StatusMessage = '';

function getProjects (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    infoContentWrite("  - Projects", true);
    for(var i=0; i < info.size; i++) {
      var project = info.values[i];
      infoContentWrite('      ' + project.name + ' ('+ project.key + ') ')
      if(options.showUris) {
        infoContentWrite('        @ ' + options.url + project.link.url)
      }
    }
  }
}

//function getRepositories (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    var info = JSON.parse(body);
//    infoContentWrite("  - Repositories", true);
//    for(var i=0; i < info.size; i++) {
//      infoContentWrite('      ' + info.values[i].name)
//    }
//  }
//}

function infoContentWrite (infoContent, clear) {
  if(clear){
    message = infoContent
  } else {
    message += infoContent
  }
  console.log(infoContent);
}

stashScm.listProjects = function () {
  options.url = host + pathProjects;
  options.headers.path = pathProjects;
  request(options, getProjects);
}

stashScm.listProjectsRepositories = function () {

}

module.exports = stashScm;