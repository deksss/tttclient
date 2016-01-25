import styles from 'styles/styles.css';

const EnemyCard = React.createClass({
  render: function () {
    return (
      <div className={styles['card-enemy']}></div>
    );
  }
});

const EnemyHand = React.createClass({
  render: function () {
  	              var cardNodes = this.props.enemyHand.map(function (card, i) {
    return (
        <EnemyCard key = {i} >
        </EnemyCard>
      );
  });
    return (
      <div className={styles['hand-up']}>
        {cardNodes}
      </div>
    );
  }
});

module.exports = EnemyHand;
