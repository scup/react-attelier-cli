/**
 * Module dependencies.
 */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import favicon from 'static-favicon';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import swig from 'swig';
import config from './config';
import routes from './routes';

const app = express();

const VIEWS_DIR = path.join(__dirname, '/../client');

// Template engine
app.engine('html', swig.renderFile);

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', VIEWS_DIR);
app.set('view engine', 'html');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(express.static(VIEWS_DIR))
  .use(routes.indexRouter);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log('Attelier server listening on port ' + app.get('port'));
});
