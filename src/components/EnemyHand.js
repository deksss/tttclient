import styles from 'styles/style.css';
import React, { PropTypes } from 'react';

const EnemyCard = React.createClass({
  render: function () {
    return (
      <div className={styles['card-enemy']}></div>
    );
  }
});

const EnemyHand = React.createClass({
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
