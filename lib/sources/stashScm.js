#!/usr/bin/env node

var stashScm = {};

var request = require("request");
var cloudsConfig = require("../../clouds.json");
var helpers = require("./helpers");
var cloner = require("./cloner");
var shell = require("shelljs");

var host = 'http://' + cloudsConfig.stash.host;
var pathProjects = cloudsConfig.stash.path.projects;
var printHeaders = false;
var executeClone = false;

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

      if (executeClone) {
        cloner.cloneIt(repository.cloneUrl);
      }
    }
  }
}

function getProjectsForRepos(error, response, body) {
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
  request(options, getProjectsForRepos);
};

stashScm.listProjects = function () {
  options.headers.path = pathProjects;
  request(options, getProjects);
};

stashScm.listProjectsRepositories = function () {
  printHeaders = true;
  request(options, getProjectsForRepos)
};

stashScm.backupRepositories = function () {
  var uniqueDir = helpers.getStamp();
  var cloneDir = "cloning";

  shell.mkdir(cloneDir);
  shell.cd(cloneDir);

  printHeaders = true;
  executeClone = true;
  request(options, getProjectsForRepos)
};



module.exports = stashScm;
