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

  callAPI = async () => {
    const res = await axios.get('/api/monah');
    const body = await res.data;

    if (res.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    return (body);
  }

  render() {
    console.log(this.props.match)
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
                <Route exact path={`${this.props.match.path}`}>
                  <SelectPlaylist />
                </Route>
                <Route exact path={`${this.props.match.path}/playlists/view`}>
                  <ViewPlaylist/>
                </Route>
              </Switch>
              <Player/>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, { getPlaylists })(WebPlayer);