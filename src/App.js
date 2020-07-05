import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from 'react-redux';
import store from './store.js';

// components
import Navbar from './components/Navbar.jsx';
import WebPlayer from './components/WebPlayer';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard'

// auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import PrivateRoute from "./components/private-routes/PrivateRoute";
import AdminRoute from "./components/private-routes/AdminRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Switch>
              <PrivateRoute path="/web-player" component={WebPlayer}/>
              <AdminRoute path="/admin" component={AdminDashboard}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
