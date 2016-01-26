import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import EnemyHand from './EnemyHand';
import GameField from './GameField';
import PlayerHand from './PlayerHand';
import InfoContainer from './infoContainer';
import styles from 'styles/style.css';

export const GameView = React.createClass({
  mixins: [PureRenderMixin],
  render: function() { 
    return <div className = {styles['game-container']}>
             <div className = {styles['game-container-main']}>
               <EnemyHand enemyHand = {this.props.enemyHand} />
               <GameField gameField = {this.props.gameField} />
               <PlayerHand playerHand = {this.props.playerHand} />
             </div>
             <InfoContainer
              whoTurn={this.props.whoTurn}
              nextTurn={this.props.nextTurn} 
              yourName={this.props.yourName} />
          </div>
  }
});


function mapStateToProps(state) {
  return {
    yourName: state.get('yourName'),
    whoTurn: state.get('whoTurn'),
    gameField: state.get('gameField'),
    enemyHand: state.get('enemyHand'),
    playerHand: state.get('playerHand')
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
