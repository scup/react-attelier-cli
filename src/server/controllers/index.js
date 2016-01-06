import fs from 'fs';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '/Users/brunoagutoli/projetos/react-attelier/webpack.config.js';

exports.index = function(req, res) {
  res.render('index');
};


exports.preview = function(req, res) {

  let path = req.param('component');
  let entryPoint = '/Users/brunoagutoli/projetos/react-attelier/.attelier/entry.jsx';

  let template = `
    import React from 'react';
    import ReactDOM from 'react-dom';

    import Comp from './components.jsx';

    class App extends React.Component {
      render(){
        return (
          <Comp />
        );
      }
    }

    ReactDOM.render(<App/>, document.getElementById('app'));
  `;

  fs.writeFile(entryPoint, template, function(err) {
    if(err) {
        return console.log(err);
    }

    config.entry = [ entryPoint ];
    config.output.filename = 'preview.js';

    webpack(config,function(err, stats) {
      res.render('preview');
    })
  });
};
