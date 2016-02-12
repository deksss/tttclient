import styles from 'styles/style.css';
import React, { PropTypes } from 'react';



var Unit = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    arrowCss: PropTypes.object.isRequired
  },
  getOpacity: function(direction) {
    const directArr = this.props.data.direction || [];
    if (directArr.find(val => val === direction)) {
      return 1;
    }  else {
      return 0
    }
  },
  render: function () {
    const UStyle = { opacity: this.getOpacity('U') };
    const DStyle = { opacity: this.getOpacity('D') };
    const RStyle = { opacity: this.getOpacity('R') };
    const LStyle = { opacity: this.getOpacity('L') };
    const ULStyle = { opacity: this.getOpacity('UL') };
    const URStyle = { opacity: this.getOpacity('UR') };
    const DLStyle = { opacity: this.getOpacity('DL') };
    const DRStyle = { opacity: this.getOpacity('DR') };
    console.log(styles[this.props.arrowCss]);
    const arrowPost =  ' ' + styles[this.props.arrowCss];
    return (
       <div className={styles['unit']}>
             <div className={styles['unit-top']}>
             <div style = {ULStyle} className={ styles['unit-top-ul'] + arrowPost }></div>
              <div style = {UStyle} className={styles['unit-top-u'] + arrowPost}></div>
              <div style = {URStyle} className={styles['unit-top-ur'] + arrowPost}></div>
            </div>
            <div className={styles['unit-mid']}>
              <div style = {LStyle} className={styles['unit-mid-l'] + arrowPost}></div>
              <div style = {RStyle} className={styles['unit-mid-r'] + arrowPost}></div>
            </div>
            <div className={styles['unit-foot']}>
              <div style = {DLStyle} className={styles['unit-foot-dl'] + arrowPost}></div>
               <div className={styles['unit-foot-hp']}> 
               {this.props.data.hp}
               </div>
              <div style = {DStyle} className={styles['unit-foot-d'] + arrowPost}></div>
               <div className={styles['unit-foot-atk']}>
               {this.props.data.atk}
               </div>
              <div style = {DRStyle} className={styles['unit-foot-dr'] + arrowPost}></div>
            </div>
            <div className={styles['unit-info']}> 
              <div>{this.props.data.name}</div>
              <hr />
              <div>{this.props.data.info}</div>
            </div>
          </div>
    );
  }
});

module.exports = Unit;
