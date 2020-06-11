import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { getPlaylists } from '../actions/playlistActions';
import { Route, Switch, Link } from 'react-router-dom';

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
      currScreen: SELECT_PLAYLIST,
    }
  }

  render() {
    return (
        <div className="web-player">
          <Navbar />
          <div className="wrapper">
            {/* <Sidenav/> */}
            <div className="container-fluid">
              {/* {this.setScreen()} */}
              {/* <Link to={`${this.props.match.path}/playlists`}>Select Playlist</Link>
              <Link to="/web-player/playlists/view">View Playlist</Link> */}
              <Switch>
                <Route exact path={`${this.props.match.path}`} component={SelectPlaylist}/>
                <Route path={`${this.props.match.path}/playlists/:id`} component={ViewPlaylist}/>
              </Switch>
              <Player/>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, { getPlaylists })(WebPlayer);