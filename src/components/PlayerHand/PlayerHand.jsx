import styles from './PlayerHand.scss';
import UnitCss from '../Unit/UnitRender.scss';
import React, { PropTypes } from 'react';
import Unit from '../Unit/UnitRender';

const PlayerCard = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    onCardClick: PropTypes.func.isRequired,
    arrowCss:  PropTypes.string.isRequired
  },
  handleClick: function () {
    this.props.onCardClick(this.props.data.id);
  },
  render: function () {
    var cssStr = styles['card-container'];
    if (this.props.selected) {
      cssStr +=  ' ' + styles['card-selected'];
    } else if (this.props.data.new) {
      cssStr +=  ' ' + styles['give-card'];
    }
    return (
      <div className = {cssStr}
        onClick = {this.handleClick}>
				<div className = {styles['card']}>
          <Unit className = {UnitCss['unit']}
                data = {this.props.data.unit}
                arrowCss = {this.props.arrowCss}
                inCard = {true} />
          <div className = {styles['card-info']}>
            {this.props.data.unit.name}
            <br />
            {this.props.data.unit.info}
          </div>
        </div>
      </div>
		);
  }
});

const PlayerHand = React.createClass({
  propTypes: {
    playerSign: PropTypes.string.isRequired,
    playerHand: PropTypes.array.isRequired
  },
  getArrowCss: function (player, active) {
    const name = player === 'P1' ?  'atk-arrow-green' : 'atk-arrow-blue';
    const ready =  active === true ? 'active' : '';
    return name + ready;
  },
  render: function () {
    var selectedCardId = this.props.selectedCard ? this.props.selectedCard.get('id') : false;
    var cardSelect = this.props.cardSelect;
    const playerSign = this.props.playerSign || '';
    const getArrowCss = this.getArrowCss;
    var cardNodes = this.props.playerHand.toJS().map(function(card, i) {
      const selected = selectedCardId === card.id || false;
      const arrowCss = getArrowCss(playerSign, card.ready);
      if (card.unit) {
        return (
          <PlayerCard arrowCss = {arrowCss}
                      selected = {selected}
                      data = {card}
                      key = {i}
                      onCardClick = {cardSelect} />
        );
      }
    });
    return (
      <div className={styles['hand-dwn']}>
        {cardNodes}
      </div>
    );
  }
});

module.exports = PlayerHand;
