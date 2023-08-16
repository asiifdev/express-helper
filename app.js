import { Command } from 'commander';
const program = new Command();

program
  .name('make:controller')
  .description('Create a Wonderful Express Templating')
  .version('1.0.0');

program.command('make:controller')
.description('Command to make a templating Express JS')
.argument('Filename', 'Namefile of Controller')
.option('-r', 'Buat router nya sekalian')
.option('-d', 'Buat dokumentasi nya sekalian')
.action((str, options) => {
    console.log(str, options)
})

program.parse(process.argv);