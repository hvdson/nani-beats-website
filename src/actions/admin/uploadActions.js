import axios from "axios";

import {
  GET_ERRORS
} from "../actions";

// TODO: leave catch for errors for now
export const adminUploadSong = (songData, history) => dispatch => {
  axios.post("/api/admin/upload", songData, { 'headers': {
    'Content-Type': 'undefined'
  }})
  .then(res => history.push("/admin"))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))

}
