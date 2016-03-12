import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import Enemy from '../Enemy/Enemy';
import GameField from '../Field/GameField';
import Player from '../Player/Player';
import InfoContainer from '../Info/infoContainer';
import styles from './Gams.scss';

export const ShowMesseges = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    const clear = this.props.clearMsg;
    setTimeout(function () {
      clear();
    }, 3000);
    if (this.props.msg && this.props.msg !== '') {
      return (
        <div className = {styles['global-info']}
             onClick = {clear}>
          <h1>{this.props.msg}</h1>
        </div>
      );
    } else {
      return (<div className = {styles['global-info--hidden']}></div>);
    }
  }
});

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
               <Enemy enemyHand = {this.props.enemyHand} 
                 enemyHP = {this.props.enemyHP}
                 enemyDeckLen = {this.props.enemyDeckLen}
               />
               <div className = {styles['game-container-main']}>
                 <ShowMesseges msg =  {this.props.msg} 
                             clearMsg = {this.props.clearMsg}
                 />
                 <GameField gameField = {this.props.gameField}
                          cellClick = {this.props.cellClick}                   
                 />
                 <InfoContainer
                  whoTurn={this.props.whoTurn}
                  nextTurn={this.props.nextTurn} 
                 />
               </div>
               <Player playerHand = {this.props.playerHand}
                  playerSign = {this.props.playerSign}
                  yourHP = {this.props.yourHP}
                  cardSelect = {this.props.cardSelect}
                  selectedCard = {this.props.selectedCard}
                  playerSign={this.props.playerSign}
                  yourDeckLen = {this.props.yourDeckLen}
               />
           </div>
    }
  }
});


function mapStateToProps(state) {
  return {
    allReady: state.get('allReady'),
    roomId: state.get('roomId'),
    playerSign: state.get('playerSign'),
    whoTurn: state.get('whoTurn'),
    gameField: state.get('field') || [],
    enemyHand: state.get('enemyHand'),
    playerHand: state.get('hand'),
    selectedCard: state.get('selectedCard'),
    yourHP: state.get('hp') || '',
    winner: state.get('winner') || false,
    enemyDeckLen: state.get('enemyDeckLenght') || '',
    yourDeckLen: state.get('deckLenght') || '',
    enemyHP: state.get('enemyHp') || '',
    msg: state.get('msg') || ''
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
