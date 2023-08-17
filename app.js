import { Command } from 'commander';
import { blueConsole, copyFiles, firstLower, greenConsole, redConsole, spinners } from './global.js';

const program = new Command();

program
  .name('make:controller')
  .description('Create a Wonderful Express Templating')
  .version('1.0.0');

program.command('make:controller')
  .description('Command to make a Controller Template Express JS')
  .argument('Filename', 'Namefile of Controller')
  .option('-r', 'Buat router nya sekalian')
  .option('-d', 'Buat dokumentasi nya sekalian')
  .action((str, options) => {
    if (str.includes('Controller')) {
      str = firstLower(str)
      copyFiles('templateController.js', `${str}.js`)
      console.log(str)
    }
    if (str.includes('controller')) {
      str = firstLower(str.replace('controller', 'Controller'))
    }
  })

program.command('make:template')
  .description('Command to make a SRC Dir templating Express JS')
  .argument('location', 'location of Template')
  .option('-r', 'Buat router nya sekalian')
  .option('-d', 'Buat dokumentasi nya sekalian')
  .action((str, options) => {
    console.log(str, options)
  })

program.parse(process.argv);