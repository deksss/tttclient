import {Map} from 'immutable';
import {sendJoin, sendCreate} from './main';
import uuid from 'uuid';

function joinRoom(state) {
  console.table(state);
  console.log('tryin join' + state.get('roomId'));
  sendJoin(state.get('roomId'), state.get('clientId'));
  return state;
}

function createRoom(state) {
  const roomId = uuid.v4();
  state = setRoomId(state, roomId);
  sendCreate(roomId, state.get('clientId'));
  return state;
}

function setConnectionState (state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}

function setState (state, newState) {
  if (newState) {
    console.log('new state have:');
    console.log(newState);
    let result = state.merge(newState);
    if (!state.get('yourName')) {
      result = setYourName(result);
    }
    if (newState.ready) {
      result = whoTurn(result);
    }
    return result;
  }
}

function setField (state, field) {
  return state.set('gameField', field);
}

function setRoomId (state, roomId) {
  console.log(roomId);
  return state.set('roomId', roomId);
}

function setPlayerHand (state, playerHand) {
  return state.set('playerHand', playerHand);
}

function setEnemyHand (state, enemyHand) {
  return state.set('enemyHand', enemyHand);
}

function start (state) {
  return state;
}

function nextTurn (state) {
  return state;
}

function whoTurn (state) {
  if (state.get('curPlayer')) {
    if (state.get('curPlayer') === state.get('yourName')) {
      return state.set('whoTurn', 'you');
    } else {
      return state.set('whoTurn', 'enemy');
    }
  } else {
    return state.set('whoTurn', 'not_ready');
  }
}

function setYourName (state) {
  const id = state.get('clientId');
  const findResult = state.get('players').find(p => p.get('id') === id);
  let name = '';
  if (findResult && findResult.get('name')) {
    name = findResult.get('name');
    return state.set('yourName', name);
  } else {
    return state.set('yourName', '');
  }
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return state.set('clientId', action.clientId);
    case 'SET_CONNECTION_STATE':
      return setConnectionState(state, action.state, action.connected);
    case 'SET_STATE':
      return setState(state, action.state);
    case 'PLAYER_START':
      return start(state);
    case 'PLAYER_SET_NAME':
      return setYourName(state);
    case 'NEXT_TURN':
      return nextTurn(state);
    case 'SET_FIELD':
      return setField(state, action.field);
    case 'SET_PLAYER_HAND':
      return setPlayerHand(state, action.playerHand);
    case 'SET_ENEMY_HAND':
      return setEnemyHand(state, action.enemyHand);
    case 'SET_ROOM_ID':
      return setRoomId(state, action.roomId);
    case 'JOIN_ROOM':
        return joinRoom(state);
    case 'CREATE_ROOM':
        return createRoom(state);
  }
  return state;
}
