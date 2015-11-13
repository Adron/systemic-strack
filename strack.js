var program = require('commander');

program
    .version('0.0.1')
    .option('-P, --Projects', 'List Projects')
    .option('-R, --Repositories', 'List All Repositories on Server.')
    .parse(process.argv);

console.log('you ordered a pizza with:');

if (program.Repositories && program.Projects) {
    console.log('  - Projects and their repositories');

} else if (program.Projects) {
    console.log('  - Projects');

} else if (program.Repositories) {
    console.log('  - Repositories');

}

console.log('.\n\n');