#!/usr/bin/env node
const prosess = require('process');
const path = require('path');
const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');
const { checkMkdirExists, copyDir, copyFile } = require('./copy');

yargs.command(
  ['create', 'c'],
  '新建一个模版',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demandOption: true,
      describe: '模版名称',
      type: 'string',
    });
  },
  async function (argv) {
    const answers = await inquirerPrompt(argv);
    const { name, type } = answers;
    const isMkdirExists = checkMkdirExists(path.resolve(process.cwd(), `./src/pages/${name}`));
    const isMkFileExists = checkMkdirExists(path.resolve(prosess.cwd(), `./src/pages/${name}/index.js`));

    if (isMkdirExists) {
      console.log(`${name}文件夹已经存在`);
      return;
    }

    if (isMkFileExists) {
      console.log(`${name}/index.js文件已经存在`);
      return;
    }

    // copyDir(path.resolve(__dirname, `../../template/${type}`), path.resolve(process.cwd(), `./src/pages/${name}`));
    copyFile(
      path.resolve(__dirname, `../../template/${type}/index.js`),
      path.resolve(process.cwd(), `./src/pages/${name}/index.js`)
    );

    console.log(path.resolve(__dirname, `../../template/${type}`), path.resolve(process.cwd(), `./src/pages/${name}`));
  }
).argv;

console.log('name: ' + yargs.argv.name);

console.log('tutu cli');
