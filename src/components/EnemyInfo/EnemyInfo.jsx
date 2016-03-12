import styles from './EnemyInfo.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var EnemyInfo = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <div className={styles['enemy-info']}>
        <div className={styles['deck']}>
        HP: {this.props.enemyHP}
        Card left: {this.props.enemyDeckLen}
        </div>
      </div>
    );
  }
});

module.exports = EnemyInfo;
