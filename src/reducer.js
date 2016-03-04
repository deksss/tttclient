import {Map, List} from 'immutable';
import {sendJoin, sendCreate, sendCreateBot} from './main';
import uuid from 'uuid';

function joinRoom (state, roomId) {
  state = setRoomId(state, roomId);
  sendJoin(roomId, state.get('clientId'), state.get('yourName'));
  return state.set('roomId', roomId)
              .set('joined', true);
}

function createRoom (state) {
  const roomId = state.get('yourName') + '(' + uuid.v4() + ')';
  state = setRoomId(state, roomId);
  sendCreate(roomId, state.get('clientId'), state.get('yourName'));
  return state.set('joined', true);
}

function createRoomBot (state) {
  const roomId = state.get('yourName') + '(' + uuid.v4() + ')';
  state = setRoomId(state, roomId);
  sendCreateBot(roomId, state.get('clientId'), state.get('yourName'));
  return state.set('joined', true);
}

function setConnectionState (state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}

function setPlayerData (state) {
  const playerSign = state.get('playerSign') || '';
  let p1n;
  let p2n;
  if (playerSign) {
    if (playerSign === 'P1') {
      p1n = 0;
      p2n = 1;
    } else if (playerSign === 'P2') {
      p1n = 1;
      p2n = 0;
    }
    return state.set('hand', state.getIn(['players', p1n, 'hand']))
                .set('selectedCard', state.getIn(['players', p1n, 'selectedCard']))
                .set('hp', state.getIn(['players', p1n, 'hp']))
                .set('deckLenght',
                   state.getIn(['players', p1n, 'deck']) ? state.getIn(['players', p1n, 'deck']).count() : 0)
                .set('enemyDeckLenght',
                   state.getIn(['players', p2n, 'deck']) ? state.getIn(['players', p2n, 'deck']).count() : 0)
                .set('enemyHp', state.getIn(['players', p2n, 'hp']))
                .set('enemyHand', state.getIn(['players', p2n, 'hand']));
  } else {
    return state;
  }
}

function setState (state, newState, rooms) {
  if (newState) {
    console.log('new state have:');
    console.log(newState);
    let result = state.merge(newState);
    if (!state.get('playerSign')) {
      result = setplayerSign(result);
    }
    if (newState.ready) {
      result = whoTurn(result);
    }
    if (!result.get('playerNumber') || result.get('playerNumber') === -1) {
      result = setYourPlayerNumber(result);
    }
    result = setPlayerData(result);
    return result.set('allReady', newState.ready)
                 .set('rooms', rooms);
  } else {
    return state.set('rooms', rooms);
  }
}

function clearMsg (state, field) {
  return state.set('msg', '');
}

function setField (state, field) {
  return state.set('field', List(field));
}

function setRoomId (state, roomId) {
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
    if (state.get('curPlayer') === state.get('playerSign')) {
      if (state.get('whoTurn') === 'you') {
        return state.set('whoTurn', 'you').set('msg', ''); 
      } else {
        return state.set('whoTurn', 'you').set('msg', 'Your Turn!'); 
      }    
    } else {
      return state.set('whoTurn', 'enemy').set('msg', '');;
    }
  } else {
    return state.set('whoTurn', 'not_ready');
  }
}

function setplayerSign (state) {
  const id = state.get('clientId');
  const findResult = state.get('players').find(p => p.get('id') === id);
  if (findResult && findResult.get('name')) {
    return state.set('playerSign', findResult.get('name'));
  } else {
    return state.set('playerSign', '');
  }
}

export function setYourPlayerNumber (state) {
  if (state.getIn(['players', 0, 'id']) === state.get('clientId')) {
    return state.set('playerNumber', 0);
  } else if (state.getIn(['players', 1, 'id']) === state.get('clientId')) {
    return state.set('playerNumber', 1);
  } else {
    return state.set('playerNumber', -1);
  }
}

function setYourName (state, name) {
  return state.set('yourName', name);
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
      return setplayerSign(state);
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
    case 'SET_YOUR_NAME':
      return setYourName(state, action.name);
    case 'CREATE_VS_BOT':
      return createRoomBot(state);
    case 'CLEAR_MSG':
      return clearMsg(state);
  }
  return state;
}
