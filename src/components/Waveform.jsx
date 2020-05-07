import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loaded, notLoaded } from '../actions/actions'

function mapStateToProps(state) {
  const { currSong, isPlaying, isLoaded } = state;
  return {
    currSong,
    isPlaying,
    isLoaded
  }
}

// apparently this is a container component
// Subscribes to the 'playing' state
class Waveform extends Component {

  componentDidMount() {
    // const track = document.querySelector('#track');
    this.waveform = WaveSurfer.create({
      barWidth: 2,
      cursorWidth: 2,
      barRadius: 2,
      barGap: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#DD2121',
      responsive: true,
      waveColor: '#AAAAAA',
      cursorColor: '#FF3333',
    });
    console.log(this.props.currSong.src);
    // this.waveform.load(this.props.currSong.src);
  };

// this is broken - need to figure out something to do with state and lifecycle and async - race condition with user pressing play before song is loaded?
  componentDidUpdate(prevProps) {
    const self = this;
    // compare newProps to old props
    const currSong = this.props.currSong.src;
    const prevSong = prevProps.currSong.src;
    const isLoaded = this.props.isLoaded;
    // check if same song
    if (currSong === prevSong && isLoaded) {
      this.waveform.playPause();
    } else {
      // load - this needs to be sync
      // might need to use promise chain.
      this.props.notLoaded();
      this.waveform.load(currSong)
      this.waveform.on('ready', () => {
        // play
        this.props.loaded();
        self.waveform.play()
        // pause
        // next track
        // previous track
      })
    }   
  }

  render() {
    return (
      <div className="col" id="waveform">
        {this.props.isLoaded ? null : <h1>Loading!</h1> }
      </div>

    );
  }
};

export default connect(mapStateToProps, { loaded, notLoaded } )(Waveform);