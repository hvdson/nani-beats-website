import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loadSong } from '../actions/actions'

import styled from 'styled-components';

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
                  <div className="col-md-3" onClick={() => this.props.loadSong(val)}>
                    <i className="far fa-play-circle fa-3x"></i>
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

export default connect(null, { loadSong })(Playlist);