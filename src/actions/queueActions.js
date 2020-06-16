import {
  LOAD_PLAYLIST_INTO_QUEUE
} from './actions'

export const loadPlaylistIntoQueue = playlistSongs => {
  return {
    type: LOAD_PLAYLIST_INTO_QUEUE,
    payload: playlistSongs
  }
}