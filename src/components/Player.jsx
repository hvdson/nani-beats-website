import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, togglePlay } from '../actions/actions'

import Waveform from './Waveform';
import TrackControls from './TrackControls';

function mapStateToProps(state) {
  const { currSong, isPlaying } = state;
  return {
    currSong,
    isPlaying
  }
}

class Player extends Component {
  render() {
    return (
      <div className="fixed-bottom">
        <div className="row">
          <TrackControls/>
          <Waveform/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, { playSong, pauseSong, togglePlay, })(Player);