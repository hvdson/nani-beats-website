import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';

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

export default class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currSong: this.props.song,
    };
    // this.newSong = this.newSong.bind(this);
    // const song = this.props.getSong();
  };


  componentDidMount() {
    // const track = document.querySelector('#track');    
    console.log(this.props.song);
    // console.log(this.props.getSong());

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#DD2121',
      responsive: true,
      waveColor: '#AAAAAA',
      cursorColor: 'transparent',
    });
    this.waveform.load(this.props.song);
  };

// this is broken - need to figure out something to do with state and lifecycle and async - race condition with user pressing play before song is loaded?
  componentDidUpdate(prevProps) {
    if (prevProps.song !== this.props.song) {
      // this.waveform.stop();
      // this.setState({ playing: !this.state.playing }); 
      this.waveform.load(this.props.song);
      // this.waveform.play();
    }
  }


  handlePlay = (e) => {
    e.preventDefault();
    // this.setState ({playing: !this.state.playing});
    if (this.state.playing) {
      this.waveform.stop()
    } else {
      this.waveform.play();
    }
    this.setState ({playing: !this.state.playing}); 
  };

  render() {
  
    return (
      // decide if using styled components or nah
      <div>
        <WaveformContainer>
          <PlayButton onClick={this.handlePlay}>
            {!this.state.playing ? 'Play' : 'Pause'}
          </PlayButton>
          <Wave id="waveform"/>
          {/* <audio id="track" src={url} controls/> */}
        </WaveformContainer>
      </div>
    );
  }
};