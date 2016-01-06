#! /usr/bin/env node

var program = require('commander');
var version = require('../../package.json').version;
var resolve = require('path').resolve;
var exists = require('fs').existsSync;

program
  .version(version)
  .option('-p, --path <path>', 'path of components')
  .parse(process.argv);

var dir = process.cwd();
var path = resolve(dir, program.path || 'src/components');
if (!exists(path)) { throw('Could not find ' + path + ' folder'); }
