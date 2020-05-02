// TODO: placeholder mp3 - need to refactor waveform to only load when 

// const initialState = {
//   currSong: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3'
// }

const initialState = {
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_SONG':
      return Object.assign({}, state, {
        // THIS WAS THE PROBLEM -> currSong: action.currSong
        // action obj has payload obj which is the data!!
        src: action.payload.content,
      })
    case 'GET_SONG':
      return state;
    default:
      return state;
      // do nothing
  }
};

export default songReducer;