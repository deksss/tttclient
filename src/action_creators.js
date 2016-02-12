export function setClientId (clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function joinRoom () {
  return {
    type: 'JOIN_ROOM'
  };
}

export function createRoom () {
  return {
    type: 'CREATE_ROOM'
  };
}

export function setRoomId (roomId) {
  return {
    type: 'SET_ROOM_ID',
    roomId
  };
}

export function setConnectionState (state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState (state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setField (field) {
  return {
    type: 'SET_FIELD',
    field
  };
}

export function setPlayerHand (playerHand) {
  return {
    type: 'SET_PLAYER_HAND',
    playerHand
  };
}

export function setEnemyHand (enemyHand) {
  return {
    type: 'SET_ENEMY_HAND',
    enemyHand
  };
}

export function next () {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function start () {
  return {
    meta: {remote: true},
    type: 'PLAYER_START'
  };
}

export function setReady () {
  return {
    meta: {remote: true},
    type: 'PLAYER_READY'
  };
}

export function nextTurn () {
  return {
    meta: {remote: true},
    type: 'NEXT_TURN'
  };
}

export function restart () {
  return {
    meta: {remote: true},
    type: 'RESTART'
  };
}

export function cardSelect (id) {
  return {
    meta: {remote: true},
    type: 'SELECT_CARD',
    cardId: id
  };
}

export function cellClick (id) {
  return {
    meta: {remote: true},
    type: 'SET_CARD',
    cellId: id
  };
}

export function setYourPlayerNumber () {
  return {
    type: 'SET_NUMBER'
  };
}