import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const VOTE_WIDTH_PERCENT = 8;

export const GameView = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  getVotesBlockWidth: function(entry) {
    return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
  },
  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry =>
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteVisualization">
                <div className="votesBlock"
                     style={{width: this.getVotesBlockWidth(entry)}}>
                </div>
              </div>
              <div className="voteCount">
                {this.getVotes(entry)}
              </div>
            </div>
          )}
        </div>
        <div className="management">
          <button ref="endTurn"
                  onClick={this.props.nextTurn}>
            {this.props.whoTurn}
          </button>
          <button ref="next"
                  className="next"
                  onClick={this.props.setReady}>
            {this.props.yourName}
          </button>
        </div>
      </div>;
  }
});


function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
    yourName: state.get('yourName'),
    whoTurn: state.get('whoTurn')
  }
}

export const GameContainer = connect(
  mapStateToProps,
  actionCreators
)(GameView);
