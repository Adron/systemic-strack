var program = require('commander');
var scmStash = require('./lib/hdqc/scmStash');

var command = {};

program
    .version('0.0.1')
    .option('-P, --Projects', 'List Projects')
    .option('-R, --Repositories', 'List All Repositories on Server.')
    .arguments('<cmd>')
    .action(function (cmd) {
        command = cmd;
    })
    .parse(process.argv);

function listProjects() {
    scmStash.getProjectListing(function (data) {
        for (var i = 0; i < data.size; i++) {
            var project = data.values[i];
            console.log('    ' + i + ' ' + project.name + ' @ ' + project.link.url);
        }
    })
}

function getRepos(name, url, key) {
    scmStash.getRepositories(function(repos){
        console.log('    ' + name + ' @ ' + url);
        for (var r = 0; r < repos.size; r ++) {
            var repo = repos.values[r];
            console.log('      ' + repo.name + ' ' + repo.cloneUrl);
        }
    }, key);
}

function getReposOnly(name, url, key) {
    scmStash.getRepositories(function(repos){
        for (var r = 0; r < repos.size; r ++) {
            var repo = repos.values[r];
            console.log('      ' + repo.name + ' ' + repo.cloneUrl);
        }
    }, key);
}

function listProjectsAndRepositories(reposOnly) {
    scmStash.getProjectListing(function (data) {
        for (var i = 0; i < data.size; i++) {
            var project = data.values[i];
            if(!reposOnly){
                getRepos(project.name, project.link.url, project.key);
            } else {
                getReposOnly(project.name, project.link.url, project.key);
            }
        }
    })
}

if (program.Repositories && program.Projects) {
    console.log('  - Projects and their repositories');
    listProjectsAndRepositories(false);
} else if (program.Projects) {
    console.log('  - Projects');
    listProjects();
} else if (program.Repositories) {
    console.log('  - Repositories');
    listProjectsAndRepositories(true);
}

if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
} else if (command == 'backup') {
    console.log('Backing up started.')
    console.log('X Cloned.')
}

program.parse(process.argv);