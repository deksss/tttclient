import styles from 'styles/style.css';
import React, { PropTypes } from 'react';
import Unit from './unitRender';
import '../styles/style.css'

const PlayerCard = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    onCardClick: PropTypes.func.isRequired
  },
  handleClick: function () {
    this.props.onCardClick(this.props.data.cardId);
  },
  render: function () {
    var cssStr;
    if (this.props.selected) {
      cssStr = styles['card-container'] + ' ' + styles['card-selected'];
    } else {
      cssStr = styles['card-container'] + ' ' + styles['give-card']; 
    }  
    return (
      <div className = {cssStr}
        onClick = {this.handleClick}>
				<div className={styles['card']}>
          <Unit className={styles['unit']} data = {this.props.data} />
          <div className={styles['card-info']}>
            {this.props.data.name}
            {this.props.data.info}
          </div>
        </div>
      </div>
		);
  }
});

const PlayerHand = React.createClass({
  propTypes: {
    playerHand: PropTypes.array.isRequired
  },
  render: function () {
    var selectedCardId = this.props.selectedCard ? this.props.selectedCard.get('cardId') : false; 
    var cardSelect = this.props.cardSelect;
    var cardNodes = this.props.playerHand.toJS().map(function(card, i, ) {    
                   console.log('card+' + card);
      var selected = selectedCardId === card.cardId || false;
      return (
        <PlayerCard selected = {selected} data = {card} key = {i} onCardClick = {cardSelect} />
      );
    });
    return (
      <div className={styles['hand-dwn']}>
        {cardNodes}
      </div>
    );
  }
});

module.exports = PlayerHand;
