// TODO: placeholder mp3 - need to refactor waveform to only load when 

// const initialState = {
//   currSong: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3'
// }
import {
  GET_SONG_URL_REQUEST,
  GET_SONG_URL_SUCCESS,
  GET_SONG_URL_FAILURE,
  LOAD_SONG,
  GET_CURR_SONG_POSITION,
  SET_CURR_SONG_POSITION
} from "../actions/actions";

const initialState = {
  position: null,
  isFetching: false,
  song: {}
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONG_URL_REQUEST:
      return { 
        ...state, isFetching: true 
      }
    case GET_SONG_URL_SUCCESS:
      return { 
        ...state, isFetching: false, song: action.payload
      }
    case GET_SONG_URL_FAILURE:
      return {
        ...state, isFetching: false, errorMessage: action.payload.message
      };
    case LOAD_SONG:
      return (Object.assign({}, state, {
        url: action.payload
      }))
    case SET_CURR_SONG_POSITION:
      return (Object.assign({}, state, {
        position: action.payload
      }))
    default:
      return state;
  }
};

export default songReducer;