// for wavesurfer.js load state
// anything needing reference to the state of the song being loaded (specifically play/pause actions)

const loadReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADED':
      return true;
    case 'NOT_LOADED':
      return false;
    default:
      return state;
  }
};

export default loadReducer;