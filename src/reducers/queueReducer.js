import {
  LOAD_PLAYLIST_INTO_QUEUE
} from "../actions/actions";

const initialState = {
  songQueue: [],
  currSongIdx: 0
}

const queueReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_PLAYLIST_INTO_QUEUE:
      return Object.assign({}, ...state, { songQueue: action.payload })
    default:
      return state;
  }
}

export default queueReducer;