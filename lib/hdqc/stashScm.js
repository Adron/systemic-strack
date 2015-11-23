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

options.url = host + pathProjects;
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

function getRepositoriesWithProjectHeaders (error, response, body) {
  if (!error && response.statusCode == 200) {
    var repositories = JSON.parse(body).values;

    if(repositories.length > 0){infoContentWrite(' - Project: ' + repositories[0].project.name)}

    for(var repoIndex = 0; repoIndex < repositories.length; repoIndex++) {
      var repository = repositories[repoIndex];
      infoContentWrite('    - ' + repository.name);
    }
  }
}

function getRepositoriesWithoutProjectHeaders (error, response, body) {
  if (!error && response.statusCode == 200) {
    var repositories = JSON.parse(body).values;

    for(var repoIndex = 0; repoIndex < repositories.length; repoIndex++) {
      var repository = repositories[repoIndex];
      infoContentWrite('    - ' + repository.name);
    }
  }
}

function getRepositories (error, response, body) {
  if (!error && response.statusCode == 200) {
    var projects = JSON.parse(body).values;
    var projectRepos = makeRepositoryUrls(projects);

    for (var i = 0; i < projectRepos.length; i++) {
      options.url = projectRepos[i];
      request(options, getRepositoriesWithoutProjectHeaders);
    }
  }
}

function getProjectsRespositories (error, response, body) {
  if (!error && response.statusCode == 200) {
    var projects = JSON.parse(body).values;
    var projectRepos = makeRepositoryUrls(projects);

    for (var i = 0; i < projectRepos.length; i++) {
      options.url = projectRepos[i];
      request(options, getRepositoriesWithProjectHeaders);
    }
  }
}

function makeRepositoryUrls (projects) {
  var builtUrls = [];
  for(var i=0; i < projects.length; i++) {
    var currentUrl = options.url;
    var formedUrl = currentUrl + projects[i].key + cloudsConfig.stash.path.repositories;
    builtUrls.push(formedUrl);
  }
  return builtUrls;
}

function infoContentWrite (infoContent, clear) {
  if(clear){
    stashScm.StatusMessage = infoContent
  } else {
    stashScm.StatusMessage += infoContent
  }
  console.log(infoContent);
}

stashScm.listRepositories = function () {
  request(options, getRepositories);
}

stashScm.listProjects = function () {
  options.headers.path = pathProjects;
  request(options, getProjects);
}

stashScm.listProjectsRepositories = function () {
  request(options, getProjectsRespositories);
}

stashScm.backupRepositories = function () {
  console.log('backup starting...');
}

module.exports = stashScm;
