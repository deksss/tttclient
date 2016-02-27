import styles from './EnemyInfo.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var EnemyInfo = React.createClass({
  render: function () {
    return (
      <div className={styles['enemy-info']}>
     HP: {this.props.enemyHP}
        <div className={styles['deck']}>
        Card left: {this.props.enemyDeckLen}
        </div>
      </div>
    );
  }
});

module.exports = EnemyInfo;
