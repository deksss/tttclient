import objectAssign from 'object-assign';

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().get('clientId');
    const roomId = store.getState().get('roomId');
    const playerNumber = store.getState().get('playerNumber');
    socket.emit('action', objectAssign({}, action, {clientId, roomId, playerNumber}));
  }
  return next(action);
};
