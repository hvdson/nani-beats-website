import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong, pauseSong, getSong } from '../actions/actions'

import styled from 'styled-components';


const WaveformContainer = styled.div`
//
`

const PlayButton = styled.button`
  color: #DD2121;
`

const Wave = styled.div`
//
`

function mapStateToProps(state) {
  const { currSong, isPlaying } = state;
  return {
    currSong,
    isPlaying
  }
}

// apparently this is a container component
// Subscribes to the 'playing' state
class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: this.props.isPlaying,
      currSong: this.props.currSong.src,
      reduxPlayTest: false,
    };
    // this.newSong = this.newSong.bind(this);
    // const song = this.props.getSong();
  };


  componentDidMount() {
    // const track = document.querySelector('#track');
    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      barRadius: 3,
      barGap: 3,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#DD2121',
      responsive: true,
      waveColor: '#AAAAAA',
      cursorColor: 'transparent',
    });
    console.log(this.props.currSong.src);
    // this.waveform.load(this.props.currSong.src);
  };

// this is broken - need to figure out something to do with state and lifecycle and async - race condition with user pressing play before song is loaded?
  componentDidUpdate(prevProps) {
    if (prevProps.currSong.src !== this.props.currSong.src) {
      console.log(prevProps.currSong.src)
      console.log(this.props.currSong.src);
      // this.waveform.stop();
      // this.setState({ playing: !this.state.playing }); 
      // this.waveform.load(this.props.song);
      // this.handlePlay();
      this.waveform.load(this.props.currSong.src);
      const self = this;

      // todo: race condition: when you press play on the playlist, the song should automatically play like in spotify
      // need to figure out how to get it functional - maybe promises?
      // sometimes it works sometimes it doesn't

      this.waveform.on('ready', () => {
        // this.props.playSong();
        self.handlePlay()
      })
    }
  }

  // todo: refactor for redux state to be handled
  handlePlay = (e) => {
    // e.preventDefault();
    // this.setState ({playing: !this.state.playing});

    if (this.props.currSong && this.props.isPlaying) {
      this.props.pauseSong();
      this.waveform.pause();
    } else {
      this.props.playSong();
      this.waveform.play();
    }
    
    this.setState ({
      playing: !this.state.playing,
      reduxPlayTest: true
    }); 

  };

  render() {
  
    // return (
    //   // todo: decide if using styled components or nah
    //   <div>
    //     <WaveformContainer>
    //       <PlayButton onClick={this.handlePlay}>
    //         {!this.state.playing ? 'Play' : 'Pause'}
    //       </PlayButton>
    //       <Wave id="waveform"/>
    //       {/* <audio id="track" src={url} controls/> */}
    //     </WaveformContainer>
    //   </div>
    // );
  
    return (
      // todo: decide if using styled components or nah
      <div className="fixed-bottom">
        <div className="row">
          <div className="col-3" onClick={this.handlePlay}>
            {!this.props.isPlaying ? <i className="far fa-play-circle fa-5x"></i> : <i className="far fa-stop-circle fa-5x"></i>}
            <h1>From Redux Playing</h1>
            {this.props.currSong.src}
          </div>
          <div className="col" id="waveform" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { playSong, pauseSong })(Waveform);