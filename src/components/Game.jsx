import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const VOTE_WIDTH_PERCENT = 8;

export const GameView = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="management">
      <button ref="endTurn"
        onClick={this.props.nextTurn}>
        {this.props.whoTurn}
      </button>
      <button ref="next"
        className="next"
        onClick={this.props.setReady}>
        {this.props.yourName}
      </button>
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    yourName: state.get('yourName'),
    whoTurn: state.get('whoTurn')
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
