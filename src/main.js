import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setRoomsState, setConnectionState, setYourPlayerNumber, setField} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App/App';
import {StartContainer} from './components/Start/Start';
import {GameContainer} from './components/Game/Game';
import {LobbyContainer} from './components/Lobby/Lobby';
import {RoomContainer} from './components/Room/Room';
import styles from 'styles/style.css';

const socket = io(`${location.protocol}//${location.hostname}:3001`);

socket.on('state', function (state) {
  if (state && state.fieldAnimation &&
  state.fieldAnimation.length > 0) {
    animateField(state);
  } else {
    store.dispatch(setState(state));
  }
});

socket.on('rooms state', function (state) {
  console.log('NEW ROOM STATE + ');
  console.table(state);
  store.dispatch(setRoomsState(state));
});

export function animateField (state) {
  var maxLoops = state.fieldAnimation.length;
  var counter = 0;
  const animationTime = 1000;
  const stateWithNewCur = store.getState()
                                 .merge({curPlayer: state.curPlayer}).toJS();
  // for endTurn button animate
  store.dispatch(setState(stateWithNewCur, state['rooms']));
  // *in future refactor and push this task in the render
  (function next () {
    if (counter++ >= maxLoops) return;
    setTimeout(function () {
      store.dispatch(setField(state.fieldAnimation[counter - 1]));
      next();
    }, animationTime);
  })();

  setTimeout(function () {
    store.dispatch(setState(state));
  }, animationTime * (maxLoops + 1));
}

export function sendCreate (roomId, playerId, name) {
  socket.emit('create', roomId, playerId, name);
}

export function sendCreateBot (roomId, playerId, name) {
  socket.emit('createVsBot', roomId, playerId, name);
}

export function sendJoin (roomId, playerId, name) {
  socket.emit('join', roomId, playerId, name);
}

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

store.dispatch(setYourPlayerNumber());

const routes = <Route component={App}>
  <Route path='/' component={StartContainer} />
  <Route path='/game' component={GameContainer} />
  <Route path='/room' component={RoomContainer} />
  <Route path='/lobby' component={LobbyContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store} className = {styles['app']}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
