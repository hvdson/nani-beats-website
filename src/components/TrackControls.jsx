import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, togglePlay } from '../actions/actions'

function mapStateToProps(state) {
  const { currSong, isPlaying, isLoaded } = state;
  return {
    currSong,
    isPlaying,
    isLoaded
  }
}

class TrackControls extends Component {
  handlePlay = () => {
    if (this.props.isLoaded) {
      this.props.togglePlay();
    }
  }

  render() {
    return (
      <div className="col-3" onClick={this.handlePlay}>
        {this.props.isPlaying ? <i className="far fa-pause-circle fa-5x"></i> : <i className="far fa-play-circle fa-5x"></i>}
      </div>
    )
  }
}

export default connect(mapStateToProps, { playSong, pauseSong, togglePlay, })(TrackControls);