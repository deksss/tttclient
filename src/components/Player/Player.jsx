import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import PlayerHand from '../PlayerHand/PlayerHand';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import styles from './Player.scss';

var Player = React.createClass({
  render: function () {
    return (
      <div className={styles['player-container']}>

        <PlayerInfo
          playerSign = {this.props.playerSign}
          yourHP = {this.props.yourHP}
          yourDeckLen = {this.props.yourDeckLen} 
        />
         <PlayerHand playerHand = {this.props.playerHand}
           playerSign = {this.props.playerSign}
           cardSelect = {this.props.cardSelect}
           selectedCard = {this.props.selectedCard}
         />
      </div>
    );
  }
});

module.exports = Player;