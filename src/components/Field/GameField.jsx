import styles from './GameField.scss';
import React, { PropTypes } from 'react';
import Unit from '../Unit/UnitRender';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const GameFieldRow = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    row: PropTypes.array.isRequired,
    cellClick: PropTypes.func.isRequired
  },
  render: function () {
    var cellClick = this.props.cellClick;
    var cellNodes = this.props.row.map(function (cell, i) {
      return (
        <GameFieldCell key = {i} cell = {cell} cellClick = {cellClick} />
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
  mixins: [PureRenderMixin],
  propTypes: {
    cell: PropTypes.object.isRequired
  },
  getAtkPlayerStyle: function () {
    if (this.props.cell.atakPlayer) {
      return { backgroundColor: 'red'};
    } else {
      return { backgroundColor: 'transparent'};
    }
  },
  getArrowCss: function () {
    if (this.props.cell.unit) {
      const name = this.props.cell.owner === 0 ?  'atk-arrow-green' : 'atk-arrow-blue';
      const ready = this.props.cell.unit.ready === true ? '-active' : '';
      return name + ready;
    } else {
      return '';
    }
  },
  getCellCss: function () {
    let css = styles['cell'];
  // for cross or circle for card background  
  //  if (this.props.cell.unit) {
  //    if (this.props.cell.owner === 0 ) {
  //       css += ' ' + styles['cell-cross'];
  //    } else {
  //       css += ' ' + styles['cell-zero'];
  //    }    
  //  }
    return css;
  },
  handleClick: function () {
    this.props.cellClick(this.props.cell.id);
  },
  render: function () {
    const unit = this.props.cell.unit || false;
    if (unit) {
    return (
      <div style = {this.getAtkPlayerStyle()} 
           className={this.getCellCss()} 
           onClick = {this.handleClick}>
        <Unit data = {unit} died = {this.props.cell.died}
              arrowCss = {this.getArrowCss()} atkDirect = {this.props.cell.atkDirect}
              inCard = {false}
              />
        <div className = {styles['unit-info']}>
          {unit.info}
        </div>
      </div>
    );
    } else {
      return (
        <div className={styles['cell']} 
             onClick = {this.handleClick}>
        </div>       
      );
    }
  }
});

const GameField = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    gameField: PropTypes.array.isRequired,
    cellClick: PropTypes.func.isRequired
  },
  render: function () {
    var cellClick = this.props.cellClick;
    var rowNodes = [this.props.gameField.toJS().slice(0, 3),
                    this.props.gameField.toJS().slice(3, 6),
                    this.props.gameField.toJS().slice(6, 9)].map(function (row, i) {
      return (
        <GameFieldRow key = {i} row = {row} cellClick = {cellClick}/>
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
