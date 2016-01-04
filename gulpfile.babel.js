import gulp from 'gulp';
// import gutil from "gulp-util";
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import runSequence from 'run-sequence';
import server from 'gulp-express';
import babel from "gulp-babel";

const source = {
  src : './src',
  dist: './dist'
};

gulp.task('webpack', function(callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    callback();
  });
});

gulp.task('build:server', function(){
  return gulp.src([`${source.src}/server/**/*.js`])
    .pipe(babel())
    .pipe(gulp.dest(`${source.dist}/server`));
});

gulp.task("default", function(){
  runSequence('webpack', ['build:server'], function(){
    server.run([`${source.dist}/server/app.js`]);
  });
});
