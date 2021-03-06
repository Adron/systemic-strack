#!/usr/bin/env node

var program = require("commander");
var stashScm = require("./lib/sources/stashScm");

var command = {};

program
  .version("0.0.1")
  .option("-p, --projects", "List Projects")
  .option("-r, --repositories", "List All Repositories on Server.")
  .arguments("<cmd>")
    .action(function (cmd) {
        command = cmd;
    })
    .parse(process.argv);

if (program.repositories && program.projects) {
    stashScm.listProjectsRepositories();
} else if (program.projects) {
    stashScm.listProjects();
} else if (program.repositories) {
    stashScm.listRepositories();
}

if (typeof command === "undefined") {
    console.error("no command given!");
    process.exit(1);
} else if (command == "backup") {
    stashScm.backupRepositories();
}