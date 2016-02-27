import styles from './InfoContainer.scss';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import EnemyInfo from '../EnemyInfo/EnemyInfo';
import LogBar from '../LogBar/LogBar';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

var ScoreBar = React.createClass({
  render: function () {
    return (
      <div className={styles['score-bar']}>
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
        <LogBar />
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
