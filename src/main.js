import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionState, setField, setPlayerHand,
        setEnemyHand, setRoomId, setYourPlayerNumber} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import {StartContainer} from './components/Start';
import {GameContainer} from './components/Game';
import styles from 'styles/style.css';
import List from 'immutable';


const socket = io(`${location.protocol}//${location.hostname}:3001`);

socket.on('state', function (state) {
  console.log('rooms from server' + state['rooms']);
  const roomId = store.getState().get('roomId');
  if (state[roomId] && 
      state[roomId].fieldAnimation && 
      state[roomId].fieldAnimation.length > 0) {
    console.log(state[roomId].fieldAnimation);
    var maxLoops = state[roomId].fieldAnimation.length;
    var counter = 0;
    (function next() {
        if (counter++ >= maxLoops) return;
        setTimeout(function() {
          store.dispatch(setField(state[roomId].fieldAnimation[counter-1]));
            next();
        }, 1000);
    })();
    setTimeout(function() {
      store.dispatch(setState(state[roomId], state['rooms']));
    }, 1000*(maxLoops+1));
  } else {
    store.dispatch(setState(state[roomId], state['rooms']));
  }
});

export function sendCreate(roomId, playerId) {
  socket.emit('create', roomId, playerId);
  console.log('send create room');
}

export function sendJoin(roomId, playerId) {
  socket.emit('join', roomId, playerId);
}


socket.on('your room id', idForClient =>
 store.dispatch(setRoomId(idForClient))
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

store.dispatch(setPlayerHand([
  {id: 1, info: 'cost 2 mana', hp: 10, atk: 1},
  {id: 2, info: 'cost 4 mana', hp: 5, atk: 1},
  {id: 3, info: 'cost 6 mana', hp: 9, atk: 6}]));

store.dispatch(setEnemyHand([{id: 1}, {id: 2}, {id: 3}]));

store.dispatch(setYourPlayerNumber());


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
