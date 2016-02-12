import styles from 'styles/style.css';
import React, { PropTypes } from 'react';
import Unit from './unitRender';

const GameFieldRow = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired
  },
  render: function () {
    var cellClick = this.props.cellClick;
    var cellNodes = this.props.data.map(function (cell, i) {
      return (
        <GameFieldCell key = {i} data = {cell} cellClick = {cellClick} />
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
  handleClick: function () {
    this.props.cellClick(this.props.data.id);
    console.log('cleick catc');
  },
  render: function () {
    const unit = this.props.data.unit || {info:'', hp: '', atk:''}; 
    return (
      <div className={styles['cell']} onClick = {this.handleClick}>
        <Unit className = 'unit' data = {unit} />
        <div className = {styles['unit-info']}>
          {unit.info}
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
    var cellClick = this.props.cellClick;
    var rowNodes = [this.props.gameField.toJS().slice(0, 3),
                    this.props.gameField.toJS().slice(3, 6),
                    this.props.gameField.toJS().slice(6, 9)].map(function (row, i) {
      return (
        <GameFieldRow key = {i} data = {row} cellClick = {cellClick}/>
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
