#!/usr/bin/env node

var program = require('commander');
var request = require('request');

var cloudsConfig = require('./clouds.json');
var authinfo = process.env.USERNAME + ":" + process.env.PASSWORD;
var host = 'http://git.hdquotecenter.com'
var path = '/rest/api/1.0/projects/';
var hostFinal = host + path;

var options = {
  url: hostFinal, //'https://api.github.com/repos/request/request',
  headers: {
    'host': 'git.hdquotecenter.com',
    'path': path,
    'accept': '*/*',
    'content-type': 'application/json',
    "connection": "keep-alive",
    "Authorization": "Basic YXhoNjQ1NDowY3RvTWVnYWx0MW4="
  }
};

function getProjectListing(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    //console.log(info);
    console.log("  - Projects");
    for(var i=0; i < info.size; i++) {
      console.log('      ' + info.values[i].name);
    }

  }
}

request(options, getProjectListing);
