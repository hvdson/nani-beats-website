import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';

import { playSong, pauseSong, loadSong } from '../actions/actions'

function mapStateToProps(state) {
  const { isPlaying, currSong } = state;
  return {
    isPlaying,
    currSong
  }
}

//TODO: update playlist to create forEACH song in playlist received

class Playlist extends Component {
  /**
    @function createTrack returns a song component to be rendered in React
    @param {track} String url of song.mp3
  */
  createTrack = (track) => {
    return (
      <div className="row">
        <div className="col-md-3" onClick={() => this.props.loadSong(track)}>
          <i className="far fa-play-circle fa-3x"></i>
        </div>
        <h2 className="col-md-9">
          blah
        </h2>
      </div>
    )
  }

  createPlaylist = (playlist) => {
    const songs = this.createTrack('test');
    return (songs);
  }

  handlePlaylistPlay(val) {
    this.props.loadSong(val)
  }

  render() {
    const playlist = this.createPlaylist(this.props.playlist);
    console.log("in render")

    return (
      <div id="playlist-container" className="container">
        <h1>Tracklist</h1>

        <ul>
          {this.props.playlist.map((val, idx) => {
            return (
              <li key={idx}>
                <div className="row">
                  <div className="col-md-3">
                    {renderPlayPause(this, val)}
                  </div>
                  <h2 className="col-md-9">val</h2>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
};

function renderPlayPause(self, val) {
    // this.props.isPlaying 
    // <i className="far fa-pause-circle fa-3x" onClick={() => this.handlePlaylistPlay(val)} />
    // <i className="far fa-play-circle fa-3x" onClick={() => this.handlePlaylistPlay(val)} />
    console.log('inside');
    console.log(self);
    console.log(val);

    if (self.props.isPlaying && self.props.currSong.src === val) {
      return (<i className="far fa-pause-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
    }
    return (<i className="far fa-play-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
    
}

export default connect(mapStateToProps, { playSong, pauseSong, loadSong })(Playlist);