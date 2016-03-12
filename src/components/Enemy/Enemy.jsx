import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import EnemyHand from '../EnemyHand/EnemyHand';
import EnemyInfo from '../EnemyInfo/EnemyInfo';
import styles from './Enemy.scss';

var Enemy = React.createClass({
  render: function () {
    return (
      <div className = {styles['enemy-container']}>
        <EnemyHand 
          enemyHand = {this.props.enemyHand} 
        />
        <EnemyInfo
          enemyHP = {this.props.enemyHP}
          enemyDeckLen = {this.props.enemyDeckLen}
        />
      </div>
    );
  }
});

module.exports = Enemy;