import { connect } from 'react-redux';
import { Link } from 'react-router';
import GameMain from './gameMain';
import { actions as counterActions } from '../redux/modules/counter';
import styles from 'styles/core.css';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
  counter: state.counter
});
export class GameView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles['app']}>
          <GameMain />
      </div>
    );
  }
}

export default connect(mapStateToProps, counterActions)(GameView);
