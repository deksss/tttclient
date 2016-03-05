import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import { Link } from 'react-router';
import styles from './Room.scss';
import logo from 'assets/logo.png'

export const Room = React.createClass({
  mixins: [PureRenderMixin],
  handleDecks: function (event) {
    this.props.selectDeck(event.target.value)
  },
  render: function() {
    var deckList = this.props.deckList.map((deck, i) =>
        <td>
          <input type = "radio"
                 name = "deckList"
                 value = {deck}
                 key = {i}
                 onClick = {this.handleDecks} />
          {deck}
        </td>);
      return (
              <div className={styles['wait-room']}>
              Select deck:
              <br />
               <tr>
                {deckList}
               </tr>
                <br />
             <Link to='/game' onClick={this.props.start} >
               Start
             </Link>
           </div>
             );
    }
});

function mapStateToProps (state) {
  console.log('rooms ' +state.get('rooms'));
   console.log('jnd ' + state.get('joined'));
  return {
    rooms: state.get('rooms') || [],
    clientId: state.get('clientId'),
    roomId: state.get('roomId'),
    joined: state.get('joined') || false,
    yourName: state.get('yourName'),
    deckList: state.get('deckList') || ['mage-deck', 'comander-deck']
  };
}

export const RoomContainer = connect(
  mapStateToProps,
  actionCreators
)(Room);
