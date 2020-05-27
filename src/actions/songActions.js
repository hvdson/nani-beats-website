import axios from "axios";

import {
  GET_SONG_URL_REQUEST,
  GET_SONG_URL_SUCCESS,
  GET_SONG_URL_FAILURE,
  LOAD_SONG,
} from "./actions";

export const getSongUrl = (s3Key) => (dispatch) => {
  dispatch({ type: GET_SONG_URL_REQUEST });
  return axios.get(`/api/songs/${s3Key}`)
    .then((signedUrl) => dispatch({ type: GET_SONG_URL_SUCCESS, payload: signedUrl }))
    .catch((error) => dispatch({ type: GET_SONG_URL_FAILURE, payload: error, error: true }))
}

export const loadSong = url => {
  return {
    type: LOAD_SONG
  };
};