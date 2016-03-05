import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import { Link } from 'react-router';
import styles from './Lobby.scss';
import logo from 'assets/logo.png'

export const RoomItem =  React.createClass({
    handleChange: function (event) {
      this.props.join(this.props.roomId);
    },
    render: function() {
    return  <div>
              <Link to='/room'  onClick = {this.handleChange}   style = {{textDecoration: 'none'}}>
                <div className = {styles['room-item']}>
              {this.props.roomId}
                </div>
              </Link>
            </div>
  }
});

export const Lobby = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var join = this.props.joinRoom;
    const roomList =  this.props.rooms.map(function(room, i) {
      return (<RoomItem className = {styles['room-item']}
                        roomId = {room}
                        join = {join}
                        key = {i} />);
    }) || [];
      return  (
             <div className={styles['lobby-container']}>
               <img src = {logo}
                className = {styles['logo-img']}
                width = "183" height = "175" alt = "Noughts and Crosses" />
                <div className = {styles['rooms-list-label']}>
                  Join room:
                </div>
              <div className = {styles['rooms-list']}>
                {roomList}
              </div>
              <Link to='/room' onClick={this.props.createRoom}>
               <button ref='Create'
                className = {styles['lobby-button']}>
                Create your room
              </button>
            </Link>
                <Link to='/room'>
               <button ref='CreateBot'
                className={styles['lobby-button']}
                onClick={this.props.createRoomBot}>
                Create Game vs Bot
              </button>
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
    roomId: state.get('roomId'),
    joined: state.get('joined') || false,
    yourName: state.get('yourName')
  };
}

export const LobbyContainer = connect(
  mapStateToProps,
  actionCreators
)(Lobby);
