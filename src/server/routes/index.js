var express = require('express'),
    controllers = require('../controllers');

var indexRouter = express.Router();

indexRouter.route('/')
  .all(controllers.index);

exports.indexRouter = indexRouter;
