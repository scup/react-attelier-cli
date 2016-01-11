#! /usr/bin/env node
var path = require('path');
var program = require('commander');
var version = require('../../package.json').version;
var resolve = require('path').resolve;
var exists = require('fs').existsSync;
var gulp = require('gulp');
var childprocess = require('child_process');

var packageDir = resolve( path.join(__dirname, '../../') );
var nodeModules = path.join(packageDir, 'node_modules/');
var gulpfile = path.join(packageDir, 'gulpfile.babel.js');

console.log(packageDir);

function run(command, params) {
  var child = childprocess.spawn(command, params);
  child.stdout.on('data',
      function (data) {
          console.log('' + data);
      }
  );
}

program
  .version(version)
  .option('-p, --path <path>', 'path of components')
  .parse(process.argv);

var dir = process.cwd();
var path = program.path || 'src/components';
if (!exists(path)) { throw('Could not find ' + path + ' folder'); }

// extract all components
run(nodeModules + 'gulp/bin/gulp.js', ['extract:components', '--gulpfile', gulpfile,'--path', path, '--dir', dir]);

// start server
// run('gulp', ['server', '--path', path, '--dir', dir]);
