import {
  GET_CURR_SONG_POSITION,
  SET_CURR_SONG_POSITION
} from './actions'

export const getSongPosition = () => {
  return {
    type: GET_CURR_SONG_POSITION
  }
}

export const setSongPosition = pos => {
  return {
    type: SET_CURR_SONG_POSITION,
    payload: pos
  }
}