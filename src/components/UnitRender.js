import styles from 'styles/style.css';
import React, { PropTypes } from 'react';

var Unit = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    arrowCss: PropTypes.object.isRequired
  },
  getOpacity: function(direction) {
    if (this.props.data &&
        this.props.data.direction.find(val => val === direction)) {
      return 1;
    }  else {
      return 0
    }
  },
  render: function () {
    const hp = this.props.data ? this.props.data.hp : '';
    const atk = this.props.data ? this.props.data.atk : '';
    const name = this.props.data ? this.props.data.name : '';
    const info = this.props.data ? this.props.data.info : '';
    const UStyle = { opacity: this.getOpacity('U') };
    const DStyle = { opacity: this.getOpacity('D') };
    const RStyle = { opacity: this.getOpacity('R') };
    const LStyle = { opacity: this.getOpacity('L') };
    const ULStyle = { opacity: this.getOpacity('UL') };
    const URStyle = { opacity: this.getOpacity('UR') };
    const DLStyle = { opacity: this.getOpacity('DL') };
    const DRStyle = { opacity: this.getOpacity('DR') };
    const backImg = styles['unit-' + this.props.data.sprite];
    const arrowPost =  ' ' + styles[this.props.arrowCss];
    const dead = this.props.died ? ' ' + styles['unit-dead'] : '';
    return (
       <div className={styles['unit'] + ' ' + backImg + dead}>
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
               {hp}
               </div>
              <div style = {DStyle} className={styles['unit-foot-d'] + arrowPost}></div>
               <div className={styles['unit-foot-atk']}>
               {atk}
               </div>
              <div style = {DRStyle} className={styles['unit-foot-dr'] + arrowPost}></div>
            </div>
            <div className={styles['unit-info']}>
              <div>{name}</div>
              <hr />
              <div>{info}</div>
            </div>
          </div>
    );
  }
});

module.exports = Unit;
