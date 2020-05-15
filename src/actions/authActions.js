import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, USER_LOADING, SET_CURRENT_USER } from "./actions";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const loginUser = userData => dispatch => {
  axios.post("/api/users/login", userData)
    .then(res => {
      // save to loacalStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // set current user to empty obj {} -> isAuthenticated will be set to false
  dispatch(setCurrentUser({}));
};