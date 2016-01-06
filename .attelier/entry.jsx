
import React from 'react';
import ReactDOM from 'react-dom';
import Attelier from 'react-attelier';

import Components from './component.jsx';

ReactDOM.render(<Attelier components={Components} />,
  document.getElementById('app')
);
