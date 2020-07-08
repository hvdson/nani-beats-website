import axios from "axios";

import {
  GET_ERRORS
} from "../actions";

// TODO: leave catch for errors for now
export const adminUploadSong = (songData, history) => dispatch => {
  for (var value of songData.values()) {
    console.log(value);
  }
  axios.post("/api/admin/upload", songData)
    .then(res => history.push("/admin"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))

}
