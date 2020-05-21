import axios from "axios";

import {
  GET_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  GET_ERRORS
} from "./actions";

// TODO: leave catch for errors for now
export const getPlaylists = () => dispatch => {
  axios.get("/api/playlists/all")
    .then(res => dispatch({
      type: GET_PLAYLISTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setCurrPlaylist = playlist => dispatch => {
  axios.get("/api/monah")
    .then(res => dispatch({
      type: SET_CURRENT_PLAYLIST,
      payload: res.data
    }))
};