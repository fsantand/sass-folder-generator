const {parseArchitecture, pattern} = require('./parser');

require('yargs')
    .scriptName('sass-folder-generator')
    .usage('$0 <cmd> [args]')
    .command('$0', 'default usage, creates a 7-1 pattern', () => {}, (argv) => {
        parseArchitecture(pattern['sevenone']);
    })
    .command('create [pattern]', 'Create a folder structure for sass', (yargs) => {
        yargs.positional('pattern', {
            type: String,
            default: 'seven-one',
            describe: 'The pattern to use',
        })
    }, (argv) => {
        console.log('Creating',argv.pattern);
        parseArchitecture(pattern[argv.pattern]);
    })
    .help()
    .argv