import objectAssign from 'object-assign';

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().get('clientId');
    const roomId = store.getState().get('roomId');
    socket.emit('action', objectAssign({}, action, {clientId, roomId}));
  }
  return next(action);
};
