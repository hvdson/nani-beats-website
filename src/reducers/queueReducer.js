import {
  LOAD_PLAYLIST_INTO_QUEUE, LOAD_SONGS_INTO_QUEUE
} from "../actions/actions";

const initialState = {
  songQueue: [],
  history: [],
  currPlaylistQueueId: ""
}

const queueReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SONGS_INTO_QUEUE:
      return Object.assign({}, state, { songQueue: action.payload })
    case LOAD_PLAYLIST_INTO_QUEUE:
      return Object.assign({}, state, { currPlaylistQueueId: action.payload })
    default:
      return state;
  }
}

export default queueReducer;