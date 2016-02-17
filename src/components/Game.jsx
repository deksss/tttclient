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
    console.log('hp ' + this.props.yourHP);
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
              yourHP={this.props.yourHP} />
          </div>
  }
});


function mapStateToProps(state) {
  return {
    yourName: state.get('yourName') || 'wait',
    whoTurn: state.get('whoTurn'),
    gameField: state.get('field') || [],
    enemyHand: state.get('enemyHand'),
    playerHand: state.get('hand'),
    selectedCard: state.get('selectedCard'),
    yourHP: state.get('hp') || ''
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
