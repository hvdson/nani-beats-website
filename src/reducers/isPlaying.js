const playReducer = (state = false, action) => {
  switch (action.type) {
    case 'PLAY':
      return true;
    case 'PAUSE':
      return false;
    case 'TOGGLE_PLAY':
      return !state;
    default:
      return state;
      // do nothing
  }
};

export default playReducer;