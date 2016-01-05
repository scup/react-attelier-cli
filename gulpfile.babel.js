import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from "webpack-dev-server";
import runSequence from 'run-sequence';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import nodemon from 'gulp-nodemon';

const source = {
  src : './src',
  dist: './dist'
};

const WEBPACK_CONFIG_PATH = './webpack.config.js';

gulp.task('webpack', function(callback) {
  // run webpack
  webpack(require(WEBPACK_CONFIG_PATH), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  let webpackDevServerConfig = Object.assign(require(WEBPACK_CONFIG_PATH), {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/client/attelier.jsx'),
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
  });

  console.log('webpackDevServerConfig: ', webpackDevServerConfig);
  // Start a webpack-dev-server
  let compiler = webpack(webpackDevServerConfig);

  new WebpackDevServer(compiler, {
      // server and middleware options
  }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('build:server', function(){
  return gulp.src(`${source.src}/server/**/*.js`)
    .pipe(babel())
    .pipe(gulp.dest(`${source.dist}/server`));
});

gulp.task('html:minify', function() {
  return gulp.src(`${source.src}/client/*.html`)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`${source.dist}/client`))
});

gulp.task("default", function(){
  runSequence('webpack', ['server'], function(){});
});

gulp.task("server", function(){
  runSequence('build:server', function(){
    nodemon({script: `${source.dist}/server/app.js`});
  });
});

gulp.task("server:dev", function(){
  process.env.NODE_ENV = 'development';
  runSequence('server', ['webpack-dev-server', 'html:minify'], function(){});
});