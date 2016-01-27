import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionState, setField, setPlayerHand, setEnemyHand} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import {StartContainer} from './components/Start';
import {GameContainer} from './components/Game';
import styles from 'styles/style.css';
require('./styles/style.css');

const socket = io(`${location.protocol}//${location.hostname}:3001`);
socket.on('state', state =>
  store.dispatch(setState(state))
);
[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

store.dispatch(setField(
  [['empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty']]));

store.dispatch(setPlayerHand([
  {id: 1, info: 'cost 2 mana', hp: 10, atk: 1},
  {id: 2, info: 'cost 4 mana', hp: 5, atk: 1},
  {id: 3, info: 'cost 6 mana', hp: 9, atk: 6}]));

store.dispatch(setEnemyHand([{id: 1}, {id: 2}, {id: 3}]));

const routes = <Route component={App}>
  <Route path='/' component={StartContainer} />
  <Route path='/game' component={GameContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store} className = {styles['app']}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
