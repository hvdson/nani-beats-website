import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loaded, notLoaded } from '../actions/actions'

const xhr = { 
  cache: 'default',
  method: 'GET', 
  credentials: 'same-origin', 
  redirect: 'follow',
  referrer: 'client'
};

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
      height: 60,
      progressColor: '#DD2121',
      responsive: true,
      waveColor: '#AAAAAA',
      cursorColor: '#FF3333',
      xhr: xhr
    });
    console.log(this.props.currSong.src);
    // this.waveform.load(this.props.currSong.src);
  };

  //TODO: get the data flow right then enable this

  componentDidUpdate(prevProps) {
    const self = this;

    if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
      const currSong = this.props.currSong.song.signedUrl;
      // const prevSong = prevProps.currSong.song.signedUrl;
      const isLoaded = this.props.isLoaded;
      // check if same song
      if (currSong && isLoaded) {
        this.waveform.playPause();
      } else {
        // load - this needs to be sync
        // might need to use promise chain.
        this.props.notLoaded();
        this.waveform.load(currSong);
        this.waveform.on('ready', () => {
          // play
          this.props.loaded();
          self.waveform.play();
          // pause
          // next track
          // previous track
        })
      }
    }
  }


  // TODO: old code doesn't work b/c currSong.signedUrl doesn't exist - maybe add to schema?
  // componentDidUpdate(prevProps) {
  //   const self = this;

  //   if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
  //     console.log(this.props.currSong.song.signedUrl);
  //   }

  //   const currSong = this.props.currSong.song.signedUrl;
  //   const prevSong = prevProps.currSong.song.signedUrl;
  //   const isLoaded = this.props.isLoaded;

  //   console.log(currSong);
  //   // check if same song
  //   if (currSong === prevSong && isLoaded) {
  //     this.waveform.playPause();
  //   } else {
  //     // load - this needs to be sync
  //     // might need to use promise chain.
  //     this.props.notLoaded();
  //     this.waveform.load(currSong);
  //     this.waveform.on('ready', () => {
  //       // play
  //       this.props.loaded();
  //       self.waveform.play();
  //       // pause
  //       // next track
  //       // previous track
  //     })
  //   }   
  // }

  // componentDidUpdate() {
  //   if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
  //     console.log(this.props.currSong.song.signedUrl);
  //   }
  // }

  render() {
    return (
      <div className="col" id="waveform">
        {this.props.isLoaded ? null : <span>Loading!</span> }
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { currSong, isPlaying, isLoaded, isFetching } = state;
  return {
    currSong,
    isPlaying,
    isLoaded,
    isFetching
  }
}

export default connect(mapStateToProps, { loaded, notLoaded } )(Waveform);