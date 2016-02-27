import styles from './LogBar.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var LogBar = React.createClass({
  render: function () {
    return (
      <div className={styles['log-bar-main']}>
      </div>
    );
  }
});

module.exports = LogBar;
