#!/usr/bin/env node

var program = require('commander');
var stashScm = require('./lib/hdqc/stashScm');

var command = {};

program
    .version('0.0.1')
    .option('-p, --projects', 'List Projects')
    .option('-r, --repositories', 'List All Repositories on Server.')
    .arguments('<cmd>')
    .action(function (cmd) {
        command = cmd;
    })
    .parse(process.argv);

if (program.repositories && program.projects) {
    stashScm.listProjects();
} else if (program.projects) {
    stashScm.listProjectsRepositories();
} else if (program.repositories) {

}

if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
} else if (command == 'backup') {
    console.log('Backing up started.');
    backup();
}