import React, { Component } from 'react';

class Preview extends Component {
  render(){
    let comp = '/preview?component=/Users/brunoagutoli/projetos/react-attelier/src/client/components/searchbar';
    return (
      <div className="preview">
        <iframe src={comp}></iframe>
      </div>
    );
  }
}

export default Preview;
