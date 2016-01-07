import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// Components
import Dashboard from './components/dashboard';
import Components from '../../.attelier/components.jsx';

class Attelier extends React.Component {
  render(){
    return (
      <Dashboard components={Components} />
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Attelier}></Route>
  </Router>
), document.getElementById('app'));
