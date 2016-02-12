import styles from 'styles/style.css';
import React, { PropTypes } from 'react';
import Unit from './unitRender';
import '../styles/style.css';

const PlayerCard = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    onCardClick: PropTypes.func.isRequired,
    arrowCss:  PropTypes.string.isRequired
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
          <Unit className={styles['unit']} 
                data = {this.props.data}
                arrowCss = {this.props.arrowCss} />
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
    yourName: PropTypes.string.isRequired, 
    playerHand: PropTypes.array.isRequired
  },
  getArrowCss: function (player, active) {
    const name = player === 'P1' ?  'atk-arrow-green' : 'atk-arrow-blue';
    const ready =  active === true ? 'active' : '';
    return name + ready; 
  },
  render: function () {
    var selectedCardId = this.props.selectedCard ? this.props.selectedCard.get('cardId') : false; 
    var cardSelect = this.props.cardSelect;
    const yourName = this.props.yourName || '';
    const getArrowCss = this.getArrowCss;
    var cardNodes = this.props.playerHand.toJS().map(function(card, i) {    
      const selected = selectedCardId === card.cardId || false;
      const arrowCss = getArrowCss(yourName, card.ready);
      return (
        <PlayerCard arrowCss = {arrowCss} 
                    selected = {selected} 
                    data = {card} 
                    key = {i} 
                    onCardClick = {cardSelect} />
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
