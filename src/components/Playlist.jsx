import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';

import styled from 'styled-components';
import url2 from '../assets/test.mp3';
const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

export default class Playlist extends Component {
  render() {

    return (
      <div id="playlist-container" class="container">
        <h1>Playlist</h1>

        <div class="row">
          <button class="col-md-3" onClick={() => this.props.setSong(url)}>
            <i class="fas fa-play"></i>
          </button>
          <h2 class="col-md-9">
            monahhhh
          </h2>
        </div>

        <div class="row">
          <button class="col-md-3" onClick={() => this.props.setSong(url2)}>
            <i class="fas fa-play"></i>
          </button>
          <h2 class="col-md-9">
            Xo tour life
          </h2>
        </div>
      </div>
    )
  }
};