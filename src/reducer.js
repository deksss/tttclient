import {List, Map} from 'immutable';

function setConnectionState(state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}

function setState(state, newState) {
  let result = state.merge(newState);
  console.log('state_seted' );

  if (!state.get('yourName')) {
    result = setReady(result);
  }

  if (newState.ready) {
    result = whoTurn(result);
  }

  return result;
}

function start(state) {
    return state;
}

function nextTurn(state) {
    return state;
}

function whoTurn (state) {
  if (state.get('curPlayer')) {
    if (state.get('curPlayer') === state.get('yourName')) {
      return state.set('whoTurn', 'you');
    }
    else {
      return state.set('whoTurn', 'enemy');
    }
  } else {
    return state.set('whoTurn', 'not_ready');
  }
}

function setReady(state) {
  const id = state.get('clientId');
  const findResult = state.get('players').find(p => p.get('id') === id);
  let name = '';
  if (findResult && findResult.get('name')) {
    name = findResult.get('name');
    return state.set('yourName', name);
  }
  else {
    return state.set('yourName', '');
  }
}



export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_CLIENT_ID':
    return state.set('clientId', action.clientId);
  case 'SET_CONNECTION_STATE':
    return setConnectionState(state, action.state, action.connected);
  case 'SET_STATE':
    return setState(state, action.state);
  case 'PLAYER_START':
    return start(state);
  case 'PLAYER_READY':
    return setReady(state);
  case 'NEXT_TURN':
    return nextTurn(state);
  }
  return state;
}
