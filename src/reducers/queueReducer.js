import {
  LOAD_PLAYLIST_INTO_QUEUE, 
  LOAD_SONGS_INTO_QUEUE,
  SET_CURR_SONG_IDX,
  SET_QUEUE_LENGTH,
  NEXT_SONG,
  PREV_SONG
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
    case NEXT_SONG:
      if (state.currSongIdx + 1 > state.queueLength - 1) {
        return { ...state, currSongIdx: 0}
      } else {
        return { ...state, currSongIdx: state.currSongIdx + 1}
      }
    case PREV_SONG:
      if (state.currSongIdx - 1 < 0) {
        return { ...state, currSongIdx: state.queueLength - 1}
      } else {
        return { ...state, currSongIdx: state.currSongIdx - 1}
      }
    default:
      return state;
  }
}

export default queueReducer;