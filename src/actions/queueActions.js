import {
  LOAD_PLAYLIST_INTO_QUEUE,
  LOAD_SONGS_INTO_QUEUE
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