export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function setConnectionState(state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function start() {
  return {
    meta: {remote: true},
    type: 'PLAYER_START'
  };
}

export function setReady() {
  return {
    meta: {remote: true},
    type: 'PLAYER_READY'
  };
}

export function nextTurn() {
  return {
    meta: {remote: true},
    type: 'NEXT_TURN'
  };
}

export function restart() {
  return {
    meta: {remote: true},
    type: 'RESTART'
  };
}
