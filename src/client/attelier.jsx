import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// Components
import Dashboard from './components/dashboard';

class Attelier extends React.Component {
  render(){
    return (
      <Dashboard />
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Attelier}></Route>
  </Router>
), document.getElementById('app'));
