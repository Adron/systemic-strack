var program = require('commander');

program
    .version('0.0.1')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .command('list [name]', 'Get a view of infrastructure on...')
    .parse(process.argv);

console.log('you ordered a pizza with:');
console.log('  - %s cheese', program.cheese);