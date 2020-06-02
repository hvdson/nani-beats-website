import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong } from '../actions/actions'

import Waveform from './Waveform';
import TrackControls from './TrackControls';
import AudioPlayer from './AudioPlayer';

class Player extends Component {
  render() {
    return (
      <div className="fixed-bottom container-fluid player-footer">
        <div className="row">
          <div className="col-2"/>
          <TrackControls/>
          {/* <Waveform/> */}
          <AudioPlayer/>
          <div className="col-2"/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { currSong, trackControls } = state;
  return {
    currSong,
    trackControls
  }
}

export default connect(mapStateToProps, { playSong, pauseSong })(Player);