import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import EnemyHand from './EnemyHand';
import GameField from './GameField';
import PlayerHand from './PlayerHand';
import InfoContainer from './infoContainer';
import styles from 'styles/style.css';
import '../styles/style.css';

export const GameView = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    if (this.props.winner) {
      alert(this.props.winner);
    }
    if (!this.props.allReady) {
      return <div>wait all players, roomId: {this.props.roomId}</div>
    } else {
      return <div className = {styles['game-container']}>
             <div className = {styles['game-container-main']}>
               <EnemyHand enemyHand = {this.props.enemyHand} />
               <GameField gameField = {this.props.gameField}
                          cellClick = {this.props.cellClick} />
               <PlayerHand playerHand = {this.props.playerHand}
                           cardSelect = {this.props.cardSelect}
                           selectedCard = {this.props.selectedCard}
                           yourName={this.props.yourName}/>
             </div>
             <InfoContainer
              whoTurn={this.props.whoTurn}
              nextTurn={this.props.nextTurn}
              yourName={this.props.yourName}
              yourHP={this.props.yourHP} 
              enemyHP={this.props.enemyHP}
              yourDeckLen={this.props.yourDeckLen}
              enemyDeckLen={this.props.enemyDeckLen}/>
           </div>
    }      
  }
});


function mapStateToProps(state) {
  return {
    allReady: state.get('allReady'),
    roomId: state.get('roomId'),
    yourName: state.get('yourName'),
    whoTurn: state.get('whoTurn'),
    gameField: state.get('field') || [],
    enemyHand: state.get('enemyHand'),
    playerHand: state.get('hand'),
    selectedCard: state.get('selectedCard'),
    yourHP: state.get('hp') || '',
    winner: state.get('winner') || false,
    enemyDeckLen: state.get('enemyDeckLenght') || '',
    yourDeckLen: state.get('deckLenght') || '',
    enemyHP: state.get('enemyHp') || ''
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
