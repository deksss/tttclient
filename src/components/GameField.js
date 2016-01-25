import styles from 'styles/style.css';

var React = require('react'),
  Unit = require('./unitRender');


var GameFieldRow = React.createClass({
  render: function () {
  	              var cellNodes = this.props.data.map(function (cell, i) {
    return (
        <GameFieldCell key = {i} data = {cell} >
        </GameFieldCell>
      );
  });
    return (
      <div className={styles['row']}>
        {cellNodes}
      </div>
    );
  }
});

var GameFieldCell = React.createClass({
  render: function () {
    return (
      <div className={styles['cell']}>
      	<Unit className="unit" data = {this.props.data}>
		</Unit>
		<div className={styles['unit-info']}>
		         {this.props.data.info}
		</div>
      </div>
    );
  }
});

var GameField = React.createClass({
  render: function () {
  	              var rowNodes = this.props.gameField.map(function (row, i) {
    return (
        <GameFieldRow key = {i} data = {row} >
        </GameFieldRow>
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
