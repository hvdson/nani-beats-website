import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';

import { playSong, pauseSong, loadSong, togglePlay } from '../actions/actions'

function mapStateToProps(state) {
  const { isPlaying, currSong, isLoaded } = state;
  return {
    isPlaying,
    currSong,
    isLoaded
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

  // todo: refactor
  // todo: it's setting state but no update to the waveplayer
  handlePlaylistPlay(val) {
    // check if the current song is loaded0
    if (this.props.currSong.src === val && this.props.isLoaded) {
      this.props.togglePlay();
    } else {
      this.props.loadSong(val);
      this.props.playSong();
    }
  }

  render() {
    const playlist = this.createPlaylist(this.props.playlist);
    console.log("in render")

    return (
      <div id="playlist-container" className="container">
        <div>
          <h1>Playlist</h1>  
        </div>

        <ul>
          {renderPlaylistHeaders()}
          {renderPlaylistItems(this, this.props.playlist)}
        </ul>
      </div>
    )
  }
};

function renderPlaylistHeaders() {
  return (
    <div className="row">
      <lh className="col-md-3" />
      <lh className="col">Artists</lh>
      <lh className="col">Title</lh>
      <lh className="col">BPM</lh>
      <lh className="col">Key</lh>
      <lh className="col">Length</lh>
      <lh className="col">Date Added</lh>
      <lh className="col">Download</lh>
    </div>
  )
}

function renderPlaylistItems(self, playlist) {
  return playlist.map((val, idx) => {
    return (
      <li key={idx}>
        <div className="row">
          <div className="col-md-3">
            {renderPlayPause(self, val)}
          </div>
          <h2 className="col-md-9">{val}</h2>
        </div>
      </li>
    )
  })
}

function renderPlayPause(self, val) {
    // this.props.isPlaying 
    // <i className="far fa-pause-circle fa-3x" onClick={() => this.handlePlaylistPlay(val)} />
    // <i className="far fa-play-circle fa-3x" onClick={() => this.handlePlaylistPlay(val)} />
    console.log('inside');

    if (self.props.isPlaying && self.props.currSong.src === val ) {
      return (<i className="far fa-pause-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
    }
    return (<i className="far fa-play-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
    
}

export default connect(mapStateToProps, { playSong, pauseSong, loadSong, togglePlay })(Playlist);