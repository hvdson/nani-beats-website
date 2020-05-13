import React, { Component } from 'react';
import { Route } from "react-router-dom";

// components
import Playlist from './Playlist.jsx';
import Player from './Player.jsx';
import Navbar from './Navbar.jsx';


class WebPlayer extends Component {
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
        <div className="web-player">
          <Navbar />
          {/* todo: need to change this because it makes the container too big and scrolls */}

          <div className="wrapper">
            <div className="sidenav" id="sidebar">
              <h1>Playlists</h1>
            </div>
            <div className="container-fluid">
              <Playlist playlist={this.state.playlist} />
              <Player />
            </div>
          </div>
        </div>
    );
  }
}

export default WebPlayer;
