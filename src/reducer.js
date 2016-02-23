import {Map, List} from 'immutable';
import {sendJoin, sendCreate} from './main';
import uuid from 'uuid';

function joinRoom(state, roomId) {
  state = setRoomId(state, roomId);
  sendJoin(roomId, state.get('clientId'));
  return state.set('roomId', roomId)
              .set('joined', true);
}

function createRoom(state) {
  const roomId = uuid.v4();
  state = setRoomId(state, roomId);
  sendCreate(roomId, state.get('clientId'));
  return state.set('joined', true);
}

function setConnectionState (state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}

function setPlayerData (state) {
  const yourName = state.get('yourName') || '';
  if (yourName === 'P1') {
    return state.set('hand', state.get('players').get(0).get('hand'))
                .set('selectedCard', state.get('players').get(0).get('selectedCard'))
                .set('hp', state.get('players').get(0).get('hp'));
  } else if (yourName === 'P2') {
    return state.set('hand', state.get('players').get(1).get('hand'))
                .set('selectedCard', state.get('players').get(1).get('selectedCard'))
                .set('hp', state.get('players').get(1).get('hp'));
  } else {
    return state;
  }
}

function setState (state, newState, rooms) {
  console.log('rooms in state set' + rooms)
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
    if (!state.get('playerNumber') || state.get('playerNumber') === -1) {
      result = setYourPlayerNumber(result);
    }

    result = setPlayerData(result);
    return result.set('allReady', newState.ready)
                 .set('rooms', rooms);
  } else {
    return state.set('rooms', rooms)
  }
}

function setField (state, field) {
  return state.set('field', List(field));
}

function setRoomId (state, roomId) {
  console.log(roomId);
  return state.set('roomId', roomId);
}

function setPlayerHand (state, playerHand) {
  return state.set('hand', playerHand);
}

function setEnemyHand (state, enemyHand) {
  return state.set('enemyHand', enemyHand)
               .set('rooms', List([]))
               .set('joined', false);
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
  var name = '';
  if (findResult && findResult.get('name')) {
    name = findResult.get('name');
    return state.set('yourName', name);
  } else {
    return state.set('yourName', '');
  }
}

//for delete:
export function setYourPlayerNumber (state) {
  if (state.get('yourName') && state.get('yourName') === 'P1') {
    return state.set('playerNumber', 0);
  } else if (state.get('yourName') && state.get('yourName') === 'P2') {
    return state.set('playerNumber', 1);
  } else {
    return state.set('playerNumber', -1);
  }
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return state.set('clientId', action.clientId);
    case 'SET_CONNECTION_STATE':
      return setConnectionState(state, action.state, action.connected);
    case 'SET_STATE':
      return setState(state, action.state, action.rooms);
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
      return joinRoom(state, action.roomId);
    case 'CREATE_ROOM':
      return createRoom(state);
    case 'SET_NUMBER':
      return setYourPlayerNumber(state);
  }
  return state;
}
