import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, togglePlay } from '../actions/actions'
import Play from '@bit/feathericons.react-feather.play';

function mapStateToProps(state) {
  const { currSong, isPlaying, isLoaded } = state;
  return {
    currSong,
    isPlaying,
    isLoaded
  }
}

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
    console.log(e);
    if (e.keyCode === 32) {
      this.handlePlay();
    }
  }

  handlePlay = () => {
    if (this.props.isLoaded) {
      this.props.togglePlay();
    }
  }

  render() {
    return (
      <div className="col-2" onKeyDown={(e) => this.detectSpacebar(e)}>
        {renderPlayButton(this)}
      </div>
    )
  }
}

function renderPlayButton(self) {
  return (
    self.props.isPlaying ? 
      <div className="far fa-pause-circle fa-3x" onClick={self.handlePlay}/> : 
      <div className="far fa-play-circle fa-3x" onClick={self.handlePlay}/>
  )
  // bit
  // <Play size='50' color='green' onClick={self.handlePlay}/>
}



export default connect(mapStateToProps, { playSong, pauseSong, togglePlay, })(TrackControls);