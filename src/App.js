import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

// components

import Navbar from './components/Navbar.jsx';
import WebPlayer from './components/WebPlayer';
import LandingPage from './components/LandingPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/web-player" component={WebPlayer}/>
        </div>
      </Router>
    );
  }
}

export default App;
