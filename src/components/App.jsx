import React from 'react';
import {ConnectionStateContainer} from './ConnectionState';
import styles from 'styles/style.css';

export default React.createClass({
  render: function() {
    return <div className = {styles['app']}>
      <ConnectionStateContainer />
      {this.props.children}
    </div>
  }
});
