
    import React from 'react';
    import ReactDOM from 'react-dom';

    import Comp from '/Users/brunoagutoli/projetos/react-attelier/src/client/components/searchbar';

    class App extends React.Component {
      render(){
        return (
          <Comp />
        );
      }
    }

    ReactDOM.render(<App/>, document.getElementById('app'));
  