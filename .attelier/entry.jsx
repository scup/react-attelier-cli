
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
  