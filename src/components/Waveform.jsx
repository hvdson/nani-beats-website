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
      cursorColor: '#DD2121',
    });
    console.log(this.props.currSong.src);
    // this.waveform.load(this.props.currSong.src);
  };

// this is broken - need to figure out something to do with state and lifecycle and async - race condition with user pressing play before song is loaded?
  componentDidUpdate(prevProps) {
    const self = this;
    this.waveform.on('ready', () => {
      self.props.playSong();      
      self.waveform.play();
    })

    const currSong = this.props.currSong.src;
    if (prevProps.currSong.src !== currSong) {
      console.log('new song!')
      this.waveform.load(currSong);


      this.handlePlay();

      // todo: race condition: when you press play on the playlist, the song should automatically play like in spotify
      // need to figure out how to get it functional - maybe promises?
      // sometimes it works sometimes it doesn't

    } else {
      console.log('same!')
    }


  }

  // todo: refactor for redux state to be handled
  handlePlay = () => {
    // keeps 'this' to outside scope
    const self = this;
    if (self.waveform.isReady) {
      if (self.props.currSong && self.props.isPlaying) {
        self.props.pauseSong();
        self.waveform.pause();
      } else {
        self.props.playSong();
        self.waveform.play();
      }
    }
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
            {!this.props.isPlaying ? <i className="far fa-play-circle fa-5x"></i> : <i className="far fa-pause-circle fa-5x"></i>}
            {this.props.currSong.src}
          </div>
          <div className="col" id="waveform" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { playSong, pauseSong })(Waveform);