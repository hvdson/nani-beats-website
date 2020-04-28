const initialState = {
  src: '',
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_SONG':
      return Object.assign({}, state, {
        currSong: action.src
      })
    default:
      return state;
      // do nothing
  }
};

export default songReducer;