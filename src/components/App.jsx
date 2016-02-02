import React from 'react';
import {ConnectionStateContainer} from './ConnectionState';
import 'style.css';

export default React.createClass({
  render: function() {
    return <div className = 'app'>
      <ConnectionStateContainer />
      {this.props.children}
    </div>
  }
});
