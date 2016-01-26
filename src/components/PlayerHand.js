import styles from 'styles/style.css';
import React from 'react';
import Unit from './unitRender';

const PlayerCard = React.createClass({
	                getInitialState: function () {
  return {classStr: 'card-container'};
},
	                componentWillReceiveProps (nextProps) {
		                const cssStr = 'card-container';
		                const cssStrSelected = 'card-container card-selected';
		                if ( nextProps.selected ) {
			                this.setState({classStr: cssStrSelected});
		} else {
			                this.setState({classStr: cssStr});
		}
	},
	                getDefaultProps () {
		                return {info:'', hp:''};
	},
	                handleClick: function () {
  this.props.onCardClick(this.props.data.id);
},
	                render: function () {
		                return (
			<div className = {styles[this.state.classStr]}
			onClick = {this.handleClick}>
				<div className={styles['card']}>
				 	<Unit className={styles['unit']} data = {this.props.data}>
				 	</Unit>
				 	<div className={styles['card-info']}>
				 	          {this.props.data.info}
				 	</div>
				 </div>
			</div>
		);
	}
});

const PlayerHand = React.createClass({
  getInitialState: function () {
    return {sellectedCardId: -1};
  },
  cardSelect: function (id) {
  	                var old = this.state.selectedCardId;
  	                if ( id !== old) {
  		                this.setState({selectedCardId: id});
  	} else {
  		                this.setState({selectedCardId: -1});
  	}
  },
  render: function () {
  	                var cardSelect = this.cardSelect,
  		                selectedId = this.state.selectedCardId;
    var cardNodes = this.props.playerHand.map(function (card, i) {
    	                var selectedThis = card.id === selectedId;
      return (
        <PlayerCard selected = {selectedThis} data = {card} key = {i} onCardClick = {cardSelect} >
        </PlayerCard>
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
