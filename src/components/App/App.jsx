import React from 'react';
import {ConnectionStateContainer} from '../Connection/ConnectionState';
import styles from 'styles/style.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className = {styles['app']}>
      <ConnectionStateContainer />
      {this.props.children}
    </div>
  }
});