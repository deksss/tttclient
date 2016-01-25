import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';

export const StartView = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return  <div className='start-container'>
              <h1>Choise your hero {this.props.clientId}</h1>
              <hr />
                <Link to='/game' onClick={this.props.start} >Start!</Link>
            </div>
  }
});

function mapStateToProps(state) {
  return {
    clientId: state.get('clientId')
  };
}

export const StartContainer = connect(
  mapStateToProps,
  actionCreators
)(StartView);
