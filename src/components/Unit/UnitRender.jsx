import styles from './UnitRender.scss';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var Unit = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    data: PropTypes.object.isRequired,
    arrowCss: PropTypes.string.isRequired,
    died: PropTypes.bool.isRequired,
    inCard: PropTypes.bool.isRequired,
    atkDirect: PropTypes.string.isRequired
  },
  getAtkCss: function (direction) {
    if (direction) {
      return ' ' + styles['anim-atk-' + direction];
    } else {
      return '';
    }
  },
  getOpacity: function (direction) {
    if (this.props.data &&
        this.props.data.direction.find(val => val === direction)) {
      return 1;
    } else {
      return 0;
    }
  },
  render: function () {
    const hp = this.props.data ? this.props.data.hp : '';
    const atk = this.props.data ? this.props.data.atk : '';
    const UStyle = { opacity: this.getOpacity('U') };
    const DStyle = { opacity: this.getOpacity('D') };
    const RStyle = { opacity: this.getOpacity('R') };
    const LStyle = { opacity: this.getOpacity('L') };
    const ULStyle = { opacity: this.getOpacity('UL') };
    const URStyle = { opacity: this.getOpacity('UR') };
    const DLStyle = { opacity: this.getOpacity('DL') };
    const DRStyle = { opacity: this.getOpacity('DR') };
    const backCss = ' ' + styles['unit-' + this.props.data.sprite];
    const arrowCss = ' ' + styles[this.props.arrowCss];
    const deadCss = this.props.died ? ' ' + styles['unit-dead'] : '';
    const atkCss = this.getAtkCss(this.props.atkDirect);
    const whereCss = this.props.inCard ? styles['card-unit'] : styles['unit'];
    return (
       <div className={whereCss + backCss + deadCss + atkCss}>
             <div className={styles['unit-top']}>
             <div style = {ULStyle} className={ styles['unit-top-ul'] + arrowCss }></div>
              <div style = {UStyle} className={styles['unit-top-u'] + arrowCss}></div>
              <div style = {URStyle} className={styles['unit-top-ur'] + arrowCss}></div>
            </div>
            <div className={styles['unit-mid']}>
              <div style = {LStyle} className={styles['unit-mid-l'] + arrowCss}></div>
              <div style = {RStyle} className={styles['unit-mid-r'] + arrowCss}></div>
            </div>
            <div className={styles['unit-foot']}>
              <div style = {DLStyle} className={styles['unit-foot-dl'] + arrowCss}></div>
               <div className={styles['unit-foot-hp']}>
               {hp}
               </div>
              <div style = {DStyle} className={styles['unit-foot-d'] + arrowCss}></div>
               <div className={styles['unit-foot-atk']}>
               {atk}
               </div>
              <div style = {DRStyle} className={styles['unit-foot-dr'] + arrowCss}></div>
            </div>
          </div>
    );
  }
});

module.exports = Unit;
