/**
 * Created by Adron Hall on 11/11/15.
 * Description: This library is used to pull specific information from a Source Control Management (SCM) System
 *   using a Stash Server.
 */

var http = require('http');
var cloudsConfig = require('../../clouds.json');

var scmStash = {};

var authinfo = process.env.USERNAME + ":" + process.env.PASSWORD;
var headerInfo = {
    'host': cloudsConfig.stash.host,
    'path': '',
    'accept': '*/*',
    'content-type': 'text/plain',
    'connection': 'keep-alive',
    'auth': authinfo
};

scmStash.getProjectListing = function (callback) {

    headerInfo.path = cloudsConfig.stash.path.projects;

    return http.get(headerInfo, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
};

scmStash.getRepositories = function (callback, project) {

    headerInfo.path =
        cloudsConfig.stash.path.projects +
        project +
        cloudsConfig.stash.path.repositories;

    return http.get(headerInfo, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
};

module.exports = scmStash;