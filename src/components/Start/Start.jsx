import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import { Link } from 'react-router';

export const RoomItem =  React.createClass({
    handleChange: function (event) {
      this.props.join(this.props.roomId);
    },
    render: function() {
    return  <div className='room-item'>
             {this.props.roomId}
              <button ref='Join'
                onClick={this.handleChange}>
                Join Game
              </button>
            </div>
  }
});

export const StartView = React.createClass({
  mixins: [PureRenderMixin],
  handleDecks: function (event) {
    this.props.selectDeck(event.target.value)
  },
  handleChange: function(event) {
    if (event.target.value === 'enter your name here') {
      this.props.setYourName(' ');
    } else {
      this.props.setYourName(event.target.value);
    }
  },
  render: function() {
    var join = this.props.joinRoom;
    var deckList = this.props.deckList.map((deck, i) =>
        <td>
          <input type = "radio"
                 name = "deckList"
                 value = {deck}
                 key = {i}
                 onClick = {this.handleDecks} />
          {deck}
        </td>);
    const roomList =  this.props.rooms.map(function(room, i) {
      return (<RoomItem roomId = {room} join = {join} key = {i} />);
    }) || [];
    if (!this.props.joined) {
      return  (
             <div className='start-container'>
              <h1>Game name here</h1>
                <input
                 type="text"
                 value={this.props.yourName}
                 onChange={this.handleChange}
                 onClick={this.handleChange}
                 onFocus={this.handleChange}
                />
              <hr />
                {roomList}
              <hr />
               <button ref='Create'
                onClick={this.props.createRoom}>
                Create Game
              </button>
               <button ref='CreateBot'
                onClick={this.props.createRoomBot}>
                Create Game vs Bot
              </button>
            </div>
            );
    } else {
      return (
              <div>
               <tr>
                {deckList}
               </tr>
                <hr />
             <Link to='/game' onClick={this.props.start} >
               Start
             </Link>
           </div>
             );
    }
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
    yourName: state.get('yourName') || 'enter your name here',
    deckList: state.get('deckList') || ['mage-deck', 'comander-deck']
  };
}

export const StartContainer = connect(
  mapStateToProps,
  actionCreators
)(StartView);
