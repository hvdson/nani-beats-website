import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from 'react-redux';
import store from './store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// components
import Navbar from './components/Navbar.jsx';
import WebPlayer from './components/WebPlayer';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard'

// subscribe components
import Subscribe from './components/subscribe-components/Subscribe';

// auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import PrivateRoute from "./components/private-routes/PrivateRoute";
import AdminRoute from "./components/private-routes/AdminRoute";
import SubscribeRoute from './components/private-routes/SubscribeRoute';

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

const stripePromise = loadStripe('pk_test_pkbIXrGG51rS5PPfD080QSpc');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <Router>
            <div className="App">
              <Navbar/>
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Switch>
                <PrivateRoute path="/web-player" component={WebPlayer}/>
                <AdminRoute path="/admin" component={AdminDashboard}/>
                <SubscribeRoute path="/subscribe" component={Subscribe}/>
              </Switch>
            </div>
          </Router>
        </Elements>
      </Provider>
    );
  }
}

export default App;
