import {
  SONG_LENGTH,
  SET_CURR_SONG_POSITION
} from './actions'

export const songLength = length => {
  return {
    type: SONG_LENGTH,
    payload: length
  }
}

export const setSongPosition = pos => {
  return {
    type: SET_CURR_SONG_POSITION,
    payload: pos
  }
}