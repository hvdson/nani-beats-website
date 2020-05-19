import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

// components
import Player from './Player';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

import SelectPlaylist from './SelectPlaylist';
import ViewPlaylist from './ViewPlaylist';

const SELECT_PLAYLIST = 1;
const VIEW_PLAYLIST = 2;


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
      currScreen: VIEW_PLAYLIST,
    }
  }

  callAPI = async () => {
    const res = await axios.get('/api/monah');
    const body = await res.data;

    if (res.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    return (body);
  }

  setScreen() {
    if (this.state.currScreen === SELECT_PLAYLIST) {
      return (<SelectPlaylist/>);
    } else if (this.state.currScreen === VIEW_PLAYLIST) {
      return (<ViewPlaylist playlist={this.state.playlist}/>);
    }
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
          <div className="wrapper">
            <Sidenav/>
            <div className="container-fluid">
              {/* <Playlist playlist={this.state.playlist} /> */}
              {this.setScreen()}
              <Player/>
            </div>
          </div>
        </div>
    );
  }
}

export default WebPlayer;
