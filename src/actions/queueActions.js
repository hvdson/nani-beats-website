import {
  LOAD_PLAYLIST_INTO_QUEUE,
  LOAD_SONGS_INTO_QUEUE,
  SET_CURR_SONG_IDX,
  SET_QUEUE_LENGTH
} from './actions'

export const loadPlaylistIntoQueue = playlistId => {
  return {
    type: LOAD_PLAYLIST_INTO_QUEUE,
    payload: playlistId
  }
}

export const loadSongsIntoQueue = playlistSongs => {
  return {
    type: LOAD_SONGS_INTO_QUEUE,
    payload: playlistSongs
  }
}

export const setCurrSongIdx = idx => {
  return {
    type: SET_CURR_SONG_IDX,
    payload: idx
  }
}

export const setQueueLength = length => {
  return {
    type: SET_QUEUE_LENGTH,
    payload: length
  }
}
