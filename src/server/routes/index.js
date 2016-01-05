var express = require('express'),
    controllers = require('../controllers');

var indexRouter = express.Router();

indexRouter.route('/')
  .all(controllers.index);

indexRouter.route('/preview')
  .all(controllers.preview);

exports.indexRouter = indexRouter;
