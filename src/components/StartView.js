import { Link } from 'react-router';

export class StartView extends React.Component {
  render () {
    return (
      <div className='start-container'>
        <h1>Choise your hero</h1>
        <hr />
        <Link to='/game'>Start!</Link>
      </div>
    );
  }
}

export default StartView;
