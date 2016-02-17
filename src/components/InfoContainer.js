import styles from 'styles/style.css';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

var EnemyInfo = React.createClass({
  render: function () {
    return (
      <div className={styles['ememy-info']}>
        <div className={styles['deck enemy-deck']}></div>
      </div>
    );
  }
});

var ScoreBar = React.createClass({
  render: function () {
    return (
      <div className={styles['score-bar']}>
      </div>
    );
  }
});

var LogBarMain = React.createClass({
  render: function () {
    return (
      <div className={styles['log-bar-main']}>
      </div>
    );
  }
});

var EndTurnButton = React.createClass({
  propTypes: {
    nextTurn: PropTypes.func.isRequired,
    whoTurn: PropTypes.string.isRequired
  },
  render: function () {
    if (this.props.whoTurn === 'you') {
      return (
        <button ref='endTurn'
        className={styles['end-turn-you']}
        onClick={this.props.nextTurn} >
        </button>
      );
    } else {
      return (
        <button ref='endTurn' className={styles['end-turn-enemy']}>
        </button>
      );
    }
  }
});

var PlayerInfo = React.createClass({
  propTypes: {
    yourName: PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className={styles['player-info']}>
         {this.props.yourName}
         <br />
         {this.props.yourHP}
      <div className={styles['deck player-deck']}></div>
      </div>
    );
  }
});

var InfoContainer = React.createClass({
  propTypes: {
    nextTurn: PropTypes.func.isRequired,
    whoTurn: PropTypes.string.isRequired,
    yourName: PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className={styles['game-container-info']}>
        <EnemyInfo />
        <ScoreBar />
        <LogBarMain />
        <EndTurnButton
        whoTurn={this.props.whoTurn}
        nextTurn={this.props.nextTurn} />
      <PlayerInfo yourName={this.props.yourName} yourHP={this.props.yourHP}/>
        <Link to='/'>Go Start</Link>
      </div>
    );
  }
});

module.exports = InfoContainer;
