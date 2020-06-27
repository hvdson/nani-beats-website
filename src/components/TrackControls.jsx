import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, togglePlay, nextSong, prevSong } from '../actions/trackControlsActions';
import { setCurrSongIdx } from '../actions/queueActions';

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

  handleNext = (e) => {
    this.props.nextSong();
    console.log('yeet next');
  }

  handlePrev = (e) => {
    this.props.prevSong();
    console.log('yeet prev');
  }

  render() {
    return (
      <div className="row d-flex align-items-center">
        <div className="col" >
          <i className="far fa-step-backward fa-2x" onClick={this.handlePrev} />
        </div>
        <div className="col" onKeyDown={(e) => this.detectSpacebar(e)}>        
          {renderPlayButton(this)}
        </div>
        <div className="col" >
          <i className="far fa-step-forward fa-2x" onClick={this.handleNext} />
        </div>
      </div>
    )
  }
}

function renderPlayButton(self) {
  return (
    self.props.trackControls.isPlaying ? 
      <i className="far fa-pause-circle fa-3x" onClick={self.handlePlay}/> : 
      <i className="far fa-play-circle fa-3x" onClick={self.handlePlay}/>
    
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

export default connect(mapStateToProps, { playSong, pauseSong, togglePlay, nextSong, prevSong, setCurrSongIdx })(TrackControls);