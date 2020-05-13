import React, { Component } from 'react';
import './App.css';

// components
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import Navbar from './components/Navbar.jsx';

import nanibeats from './assets/nanibeatslogo.png'
import cloutKirby from './assets/cloutkirby.jpg'


class App extends Component {
  constructor(props) {
    super(props);
    // TODO: refactor code to use this
    this.state = {
      playlist: {
        id: "hashedplaylistid69",
        name: "Nani Picks",
        songs: []
      }, 
      data: null,
    }
  }

  callAPI = async () => {
    const res = await fetch('/api/monah');
    const body = await res.json();

    if (res.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    return (body);
  }

  componentDidMount() {
    this.callAPI()
    .then(res => this.setState((prevState) => ({
      playlist: {
        ...prevState.playlist,
        songs: [...prevState.playlist.songs, res]
      }
    })))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Navbar/>

        {/* todo: need to change this because it makes the container too big and scrolls */}

        <div className="wrapper">

          <div className="sidenav" id="sidebar">
            <p> sidebar </p> 
            <h1>Playlists</h1>

          </div>

          <div className="container-fluid">
            <div className="row">
              <Playlist playlist={this.state.playlist}/>
            </div>
            <Player/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
