import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
import { Link } from 'react-router';
import styles from './Start.scss';
import logo from 'assets/logo.png';
import playImg from 'assets/Play.png'

export const StartView = React.createClass({
  mixins: [PureRenderMixin],
  handleChange: function(event) {
      this.props.setYourName(event.target.value);
  },
  render: function() {
      return  (
             <div className={styles['start-container']}>
               <img src = {logo}
                className = {styles['logo-img']}
                width = "440" height = "422" alt = "Noughts and Crosses" />
              <input className = {styles['input-name']}
                 type="text"
                 placeholder="ENTER YOUR NAME"
                 value={this.props.yourName}
                 onChange={this.handleChange}
                />
              <Link to='/lobby' >
              <button ref='Start'
                className={styles['start-button']}>
                <img src = {playImg}
                 width = "143" height = "53" alt = "Play!" />
               </button>
            </Link>
            </div>
            );
  }
});

function mapStateToProps (state) {
  return {
    yourName: state.get('yourName')
  };
}

export const StartContainer = connect(
  mapStateToProps,
  actionCreators
)(StartView);
