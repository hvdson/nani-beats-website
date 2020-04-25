import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';

import styled from 'styled-components';
import url from '../assets/test.mp3';
const url2 = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

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

    // this.newSong = this.newSong.bind(this);
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

  newSong = (newTrack) => {
    this.setState({mp3: newTrack});
  }

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

        {/* for playlist - need to separate and put into function to pull from array also put into different component file*/}
        <div id="playlist-container" class="container">
          <h1>Playlist</h1>
          
          <div class="row">
            <button class="col-md-3" onClick={this.newSong}>
              <i class="fas fa-play"></i>
            </button>
            <h2 class="col-md-9">
              monahhhh
            </h2>
          </div>

          <div class="row">
            <button class="col-md-3" onClick={this.newSong}>
              <i class="fas fa-play"></i>
            </button>
            <h2 class="col-md-9">
              Xo tour life
            </h2>
          </div>
        </div>
      </div>
    );
  }
};