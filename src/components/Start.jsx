import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import '../styles/style.css';


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
  render: function() {
    var join = this.props.joinRoom;
    const roomList =  this.props.rooms.map(function(room, i) { 
      return (<RoomItem roomId = {room} join = {join} key ={i} />);
    }) || [];
    if (!this.props.joined) {
      return  (
             <div className='start-container'>
              <h1>Hello, your ID: {this.props.clientId}</h1>
              <hr />
                {roomList}
              <hr />
               <button ref='Create'
                onClick={this.props.createRoom}>
                Create Game
              </button>
            </div>
            );
    } else {
      return (
             <Link to='/game' onClick={this.props.start} >
               Start
             </Link>
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
    joined: state.get('joined') || false
  };
}

export const StartContainer = connect(
  mapStateToProps,
  actionCreators
)(StartView);
