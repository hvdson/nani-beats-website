import {
  LOAD_PLAYLIST_INTO_QUEUE, 
  LOAD_SONGS_INTO_QUEUE,
  SET_CURR_SONG_IDX,
  SET_QUEUE_LENGTH
} from "../actions/actions";

const initialState = {
  songQueue: [],
  history: [],
  currPlaylistQueueId: "",
  currSongIdx: 0,
  queueLength: 0
}

const queueReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SONGS_INTO_QUEUE:
      return { ...state, songQueue: action.payload }
    case LOAD_PLAYLIST_INTO_QUEUE:
      return { ...state, currPlaylistQueueId: action.payload }
    case SET_CURR_SONG_IDX:
      return { ...state, currSongIdx: action.payload }
    case SET_QUEUE_LENGTH:
      return { ...state, queueLength: action.payload }
    default:
      return state;
  }
}

export default queueReducer;