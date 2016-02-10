import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import '../styles/style.css';

export const StartView = React.createClass({
  mixins: [PureRenderMixin],
  handleChange: function (event) {
      this.props.setRoomId(event.target.value);
  },
  render: function() {
    console.log(this.props.roomId);
    return  <div className='start-container'>
              <h1>Hello {this.props.clientId}</h1>
              <hr />
              <button ref='Create'
                onClick={this.props.createRoom}>
                Create Game
              </button>
              <hr />
              <input type="text" value={this.props.roomId} onChange={this.handleChange} />
              <hr />
              <button ref='Join'
                onClick={this.props.joinRoom}>
                Join Game
              </button>
              <hr />
              <Link to='/game' onClick={this.props.start} >
                  Start!
              </Link>
            </div>
  }
});

function mapStateToProps (state) {
  return {
    clientId: state.get('clientId'),
    roomId: state.get('roomId')
  };
}

export const StartContainer = connect(
  mapStateToProps,
  actionCreators
)(StartView);
