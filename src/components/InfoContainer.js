import styles from 'styles/style.css';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

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

var InfoContainer = React.createClass({
  propTypes: {
    nextTurn: PropTypes.func.isRequired,
    whoTurn: PropTypes.string.isRequired,
    playerSign: PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className={styles['game-container-info']}>
        <EnemyInfo 
        enemyHP = {this.props.yourHP}
        enemyDeckLen = {this.props.yourDeckLen} />
        <ScoreBar />
        <LogBarMain />
        <EndTurnButton
        whoTurn={this.props.whoTurn}
        nextTurn={this.props.nextTurn} />
        <PlayerInfo 
        playerSign = {this.props.playerSign}
        yourHP = {this.props.yourHP}
        yourDeckLen = {this.props.yourDeckLen} />
        <Link to='/'>Go Start</Link>
      </div>
    );
  }
});

module.exports = InfoContainer;
