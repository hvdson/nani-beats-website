import axios from "axios";

import {
  GET_SONG_URL_REQUEST,
  GET_SONG_URL_SUCCESS,
  GET_SONG_URL_FAILURE,
  LOAD_SONG,
  GET_CURR_SONG_POSITION,
  SET_CURR_SONG_POSITION
} from "./actions";

export const getSongUrl = (songObj) => (dispatch) => {
  const key = songObj.s3Key;
  dispatch({ type: GET_SONG_URL_REQUEST });
  return axios.get(`/api/songs/${key}`)
    .then((res) => {
      const songWithSignedUrl = Object.assign({}, songObj, { signedUrl: res.data })
      dispatch({ type: GET_SONG_URL_SUCCESS, payload: songWithSignedUrl })
    })
    .catch((error) => dispatch({ type: GET_SONG_URL_FAILURE, payload: error, error: true }))
}

export const loadSong = url => {
  return {
    type: LOAD_SONG
  };
};