#!/usr/bin/env node

var stashScm = {};

var request = require('request');
var cloudsConfig = require('../../clouds.json');
var helpers = require('./helpers');

var host = 'http://' + cloudsConfig.stash.host;
var pathProjects = cloudsConfig.stash.path.projects;
var printHeaders = false;

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

options.url = host + pathProjects;

// TODO: This code needs refactored badly. For instance the if stat code 200 code and much of the JSON parsing should be refactored to a single function call.
// TODO: Refactor 200 status code segment.
// TODO: Refactor parsing.
function getProjects (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    helpers.infoContentWrite("  - Projects", true);
    for(var i=0; i < info.size; i++) {
      var project = info.values[i];
      helpers.infoContentWrite('      ' + project.name + ' (' + project.key + ') ');
      if(options.showUris) {
        helpers.infoContentWrite('        @ ' + options.url + project.link.url)
      }
    }
  }
}

function getRepos (error, response, body) {
  if (!error && response.statusCode == 200) {
    var repositories = JSON.parse(body).values;

    if(repositories.length > 0 && printHeaders){helpers.infoContentWrite(' - Project: ' + repositories[0].project.name)}

    for(var repoIndex = 0; repoIndex < repositories.length; repoIndex++) {
      var repository = repositories[repoIndex];
      helpers.infoContentWrite('    - ' + repository.name);
    }
  }
}

// TODO: Refactor 200 status code segment.
// TODO: Refactor parsing.
function getRepositories (error, response, body) {
  if (!error && response.statusCode == 200) {
    var projectRepos = helpers.getProjectRepoUrls(JSON.parse(body).values, options.url);

    for (var i = 0; i < projectRepos.length; i++) {
      options.url = projectRepos[i];
      request(options, getRepos);
    }
  }
}

// TODO: Refactor 200 status code segment.
// TODO: Refactor parsing.
function getProjectsRespositories (error, response, body) {
  if (!error && response.statusCode == 200) {
    var projectRepos = helpers.getProjectRepoUrls(JSON.parse(body).values, options.url);

    for (var i = 0; i < projectRepos.length; i++) {
      options.url = projectRepos[i];
      request(options, getRepos);
    }
  }
}

stashScm.listRepositories = function () {
  printHeaders = false;
  request(options, getRepositories);
};

stashScm.listProjects = function () {
  options.headers.path = pathProjects;
  request(options, getProjects);
};

stashScm.listProjectsRepositories = function () {
  printHeaders = true;
  request(options, getProjectsRespositories)
};

stashScm.backupRepositories = function () {

  var stamp = helpers.getStamp();
  var id = helpers.getUuid();
  var backup_dir = stamp + '-' + id;

  console.log(id);
  console.log(stamp);
  console.log(backup_dir);



};



module.exports = stashScm;
