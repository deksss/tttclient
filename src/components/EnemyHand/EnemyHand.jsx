import styles from './EnemyHand.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const EnemyCard = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <div className={styles['card-enemy']}></div>
    );
  }
});

const EnemyHand = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    enemyHand: PropTypes.array.isRequired
  },
  render: function () {
    var cardNodes = this.props.enemyHand.toJS().map(function (card, i) {
      if (card.unit) {
        return (
          <EnemyCard key = {i} />
        );
      }
    });
    return (
      <div className={styles['hand-up']}>
        {cardNodes}
      </div>
    );
  }
});

module.exports = EnemyHand;
