import styles from 'styles/styles.css';
import { Link } from 'react-router';

var React = require('react');



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
  render: function () {
    return (
      <a className={styles['end-turn-button']}>
      	 'End Turn'
      </a>
    );
  }
});

var PlayerInfo = React.createClass({
  render: function () {
    return (
      <div className={styles['ememy-info']}>
      	<div className={styles['deck player-deck']}></div>
      </div>
    );
  }
});




var InfoContainer = React.createClass({
  render: function () {
    return (
      <div className={styles['game-container-info']}>
      	<EnemyInfo />
      	<ScoreBar />
      	<LogBarMain />
      	<EndTurnButton />
      	<PlayerInfo />
        <Link to='/'>Go Start</Link>
      </div>
    );
  }
});

module.exports = InfoContainer;
