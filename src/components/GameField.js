import styles from 'styles/style.css';
import React, { PropTypes } from 'react';
import Unit from './unitRender';

const GameFieldRow = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired
  },
  render: function () {
    var cellNodes = this.props.data.map(function (cell, i) {
      return (
        <GameFieldCell key = {i} data = {cell} />
      );
    });
    return (
      <div className={styles['row']}>
        {cellNodes}
      </div>
    );
  }
});

const GameFieldCell = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className={styles['cell']}>
        <Unit className = 'unit' data = {this.props.data} />
        <div className = {styles['unit-info']}>
          {this.props.data.info}
        </div>
      </div>
    );
  }
});

const GameField = React.createClass({
  propTypes: {
    gameField: PropTypes.array.isRequired
  },
  render: function () {
    var rowNodes = this.props.gameField.map(function (row, i) {
      return (
        <GameFieldRow key = {i} data = {row} />
      );
    });
    return (
      <div className={styles['field']}>
        {rowNodes}
      </div>
    );
  }
});

module.exports = GameField;

