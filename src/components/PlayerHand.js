import styles from 'styles/style.css';
import React, { PropTypes } from 'react';
import Unit from './unitRender';

const PlayerCard = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    onCardClick: PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {classStr: 'card-container'};
  },
  componentWillReceiveProps (nextProps) {
    const cssStr = styles['card-container'] + ' ' + styles['give-card'];
    const cssStrSelected = styles['card-container'] + ' ' + styles['card-selected'];
    if (nextProps.selected) {
      this.setState({classStr: cssStrSelected});
    } else {
      this.setState({classStr: cssStr});
    }
  },
  getDefaultProps () {
    return {info: '', hp: ''};
  },
  handleClick: function () {
    this.props.onCardClick(this.props.data.id);
  },
  render: function () {
    return (      
      <div className = {this.state.classStr}
        onClick = {this.handleClick}>
				<div className={styles['card']}>
          <Unit className={styles['unit']} data = {this.props.data} />
          <div className={styles['card-info']}>
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
  getInitialState: function () {
    return {sellectedCardId: -1};
  },
  cardSelect: function (id) {
    const old = this.state.selectedCardId;
    if (id !== old) {
      this.setState({selectedCardId: id});
    } else {
      this.setState({selectedCardId: -1});
    }
  },
  render: function () {
    var cardSelect = this.cardSelect;
    var  selectedId = this.state.selectedCardId;
    var  cardNodes = this.props.playerHand.map(function(card, i) {
      var selectedThis = card.id === selectedId;
      return (
        <PlayerCard selected = {selectedThis} data = {card} key = {i} onCardClick = {cardSelect} />
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
