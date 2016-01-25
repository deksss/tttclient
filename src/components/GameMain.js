var React = require('react'),
  EnemyHand = require('./enemyHand'),
  GameField = require('./gameField'),
  PlayerHand = require('./playerHand'),
  InfoContainer = require('./infoContainer');
import styles from 'styles/styles.css';

const playerHandExmpl = [
  {id: 1, info: 'cost 2 mana', hp: 10, atk: 1},
  {id: 2, info: 'cost 4 mana', hp: 5, atk: 1},
  {id: 3, info: 'cost 6 mana', hp: 9, atk: 6}
];

const enemyHandExmpl = [
  {id: 1},
  {id: 2},
  {id: 3},
];

const gameFieldExmp = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty']
];

var GameMain = React.createClass({
  getInitialState: function () {
    return {playerHand: [],
    	enemyHand: [],
    	gameField: []
    };
  },
  componentDidMount: function () {
    this.setState({playerHand: playerHandExmpl,
    enemyHand: enemyHandExmpl,
    gameField: gameFieldExmp });
  },
  render: function () {
    return (
      <div className = {styles['game-container']}>
        <div className = {styles['game-container-main']}>
         <EnemyHand enemyHand = { this.state.enemyHand } />
         <GameField gameField = { this.state.gameField } />
         <PlayerHand playerHand = { this.state.playerHand } />
        </div>
        <InfoContainer />
      </div>
    );
  }
});

module.exports = GameMain;
