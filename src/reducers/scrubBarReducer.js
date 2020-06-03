import {
  SET_CURR_SONG_POSITION,
  SONG_LENGTH
} from '../actions/actions'

const initialState = {
  position: null,
  length: null
}

const scrubBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURR_SONG_POSITION:
      return { ...state, position: action.payload };
    case SONG_LENGTH:
      return { ...state, length: action.payload };
    default:
      return state
  }
}

export default scrubBarReducer;
