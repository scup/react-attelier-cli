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
import ReactEngine from 'express-react-engine';

let app = express();

// Template engine
app.engine('html', swig.renderFile);

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes.indexRouter);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
