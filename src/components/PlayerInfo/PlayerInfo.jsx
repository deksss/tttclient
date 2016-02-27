import styles from './PlayerInfo.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var PlayerInfo = React.createClass({
  propTypes: {
    playerSign: PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className={styles['player-info']}>
         {this.props.playerSign}
         <br />
        HP: {this.props.yourHP}
      <div className={styles['deck']}>
      Card left: {this.props.yourDeckLen}
      </div>
      </div>
    );
  }
});

module.exports = PlayerInfo;
