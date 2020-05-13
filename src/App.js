import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

// components
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import Navbar from './components/Navbar.jsx';

import nanibeats from './assets/nanibeatslogo.png'
import cloutKirby from './assets/cloutkirby.jpg'
import WebPlayer from './components/WebPlayer';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <WebPlayer/>
        </div>
      </Router>
    );
  }
}

export default App;
