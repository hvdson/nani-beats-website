import axios from "axios";

const setAuthToken = tok => {
  if (tok) {
    // Apply auth to every request if logged in
    axios.defaults.headers.common["Authorization"] = tok;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;