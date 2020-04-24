import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';

import styled from 'styled-components';
// import '../public/test.mp3';

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
      mp3: null,
      playing: false,
    };
  };

  componentDidMount() {
    // const track = document.querySelector('#track');
    const track = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3'
    
    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.waveform.load(track);
  };

  setmp3file = (file) => {
    this.setState({ mp3: file });
  };

  handlePlay = () => {
    this.setState ({playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3'
    // const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'
    // const url = '/public/test.mp3'
    
  
    return (
      <WaveformContainer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? 'Play' : 'Pause'}
        </PlayButton>
        <Wave id="waveform"/>
        <audio id="track" src={url} controls/>
      </WaveformContainer>
    );
  }
};