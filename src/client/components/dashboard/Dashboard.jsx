import React, { Component } from 'react';

// Styles
import style from './Dashboard.styl';

// Components
import Sidebar from './sidebar';
import Preview from 'components/preview';

class Dashboard extends Component {
  render(){
    return (
      <div className="dashboard">
        <Sidebar />
        <Preview />
      </div>
    );
  }
}

export default Dashboard;
