import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackControls from './TrackControls';
import AudioPlayer from './AudioPlayer';
import ScrubBar from './ScrubBar';

class Player extends Component {
  render() {
    return (
      <div className="fixed-bottom d-flex flex-column align-items-center justify-content-center container-fluid player-footer">
          {/* <div className="col-2"/> */}
          <AudioPlayer />
          <TrackControls/>
          <ScrubBar/>
          {/* <div className="col-2"/> */}
            {/* <Waveform/> */}
            {/* <div className="col-2"/> */}
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

export default connect(mapStateToProps, null )(Player);