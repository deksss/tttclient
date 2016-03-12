import styles from './InfoContainer.scss';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import LogBar from '../LogBar/LogBar';


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
  },
  render: function () {
    return (
      <div className={styles['game-container-info']}>
        <ScoreBar />
        <LogBar />
        <EndTurnButton
        whoTurn={this.props.whoTurn}
        nextTurn={this.props.nextTurn} />
      </div>
    );
  }
});

module.exports = InfoContainer;
