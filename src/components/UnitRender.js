import styles from 'styles/style.css';

var React = require('react');

var Unit = React.createClass({
  render: function () {
    return (
       <div className={styles['unit']}>
             <div className={styles['unit-top']}>
              <div className={ styles['unit-top-ul']}></div>
              <div className={styles['unit-top-u']}></div>
              <div className={styles['unit-top-ur']}></div>
            </div>
            <div className={styles['unit-mid']}>
              <div className={styles['unit-mid-l']}></div>
              <div className={styles['unit-mid-r']}></div>
            </div>
            <div className={styles['unit-foot']}>
              <div className={styles['unit-foot-dl']}></div>
               <div className={styles['unit-foot-hp']}> {this.props.data.hp}</div>
              <div className={styles['unit-foot-d']}></div>
               <div className={styles['unit-foot-atk']}>{this.props.data.atk}</div>
              <div className={styles[ 'unit-foot-dr']}></div>
            </div>
            <div className={styles['unit-info']}> {this.props.data.info}</div>
          </div>
    );
  }
});

module.exports = Unit;
