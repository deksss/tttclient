import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import EnemyHand from '../EnemyHand/EnemyHand';
import GameField from '../Field/GameField';
import PlayerHand from '../PlayerHand/PlayerHand';
import InfoContainer from '../Info/infoContainer';
import styles from './Gams.scss';

export const ShowMesseges = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    setTimeout(function () {
       this.props.clearMsg();
    }, 2000);
  },
  render: function () {
    if (this.props.msg && this.props.msg !== '') {
      return (
        <div className = {styles['global-info']}>
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
             <div className = {styles['game-container-main']}>
               <ShowMesseges msg =  {this.props.msg} 
                             clearMsg = {this.props.clearMsg}/>
               <EnemyHand enemyHand = {this.props.enemyHand} />
               <GameField gameField = {this.props.gameField}
                          cellClick = {this.props.cellClick}                   
               />
               <PlayerHand playerHand = {this.props.playerHand}
                           cardSelect = {this.props.cardSelect}
                           selectedCard = {this.props.selectedCard}
                           playerSign={this.props.playerSign}/>
             </div>
             <InfoContainer
              whoTurn={this.props.whoTurn}
              nextTurn={this.props.nextTurn}
              playerSign={this.props.playerSign}
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
