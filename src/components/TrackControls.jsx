import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, togglePlay } from '../actions/actions'
import Play from '@bit/feathericons.react-feather.play';


class TrackControls extends Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.detectSpacebar = this.detectSpacebar.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.detectSpacebar);
  }

  detectSpacebar = (e) => {
    if (e.keyCode === 32) {
      this.handlePlay();
    }
  }

  handlePlay = () => {
    if (this.props.trackControls.isLoaded) {
      this.props.togglePlay();
    }
  }

  render() {
    return (
      <div className="col-1" onKeyDown={(e) => this.detectSpacebar(e)}>
        {renderPlayButton(this)}
      </div>
    )
  }
}

function renderPlayButton(self) {
  return (
    self.props.trackControls.isPlaying ? 
      <div className="far fa-pause-circle fa-2x" onClick={self.handlePlay}/> : 
      <div className="far fa-play-circle fa-2x" onClick={self.handlePlay}/>
  )
  // bit
  // <Play size='50' color='green' onClick={self.handlePlay}/>
}

function mapStateToProps(state) {
  const { currSong, trackControls } = state;
  return {
    currSong,
    trackControls
  }
}


export default connect(mapStateToProps, { playSong, pauseSong, togglePlay, })(TrackControls);