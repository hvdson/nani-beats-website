import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { playSong } from '../actions/actions'

import styled from 'styled-components';

import url2 from '../assets/test.mp3';
const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

const WaveformContainer = styled.div`
//
`

const PlayButton = styled.button`
  color: #DD2121;
`

const Wave = styled.div`
//
`


// apparently this is a container component
// Subscribes to the 'playing' state
class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currSong: this.props.song,
      reduxPlayTest: false,
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
    this.waveform.load(this.props.song);
  };



// this is broken - need to figure out something to do with state and lifecycle and async - race condition with user pressing play before song is loaded?
  componentDidUpdate(prevProps) {
    if (prevProps.song !== this.props.song) {
      // this.waveform.stop();
      this.setState({ playing: !this.state.playing }); 
      this.waveform.load(this.props.song);
      // this.waveform.play();
    }
  }

  // todo: refactor for redux state to be handled
  handlePlay = (e) => {
    e.preventDefault();
    // this.setState ({playing: !this.state.playing});
    if (this.state.playing) {
      this.waveform.stop()
    } else {
      this.waveform.play();
    }
    // todo: apparently this works in debug... find out why.
    // need to use the toggle reducer and action
    this.props.playSong(this.state.reduxPlayTest);
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
            {!this.state.playing ? <i className="far fa-play-circle fa-5x"></i> : <i className="far fa-stop-circle fa-5x"></i>}
            <h1>From Redux Playing</h1>


          </div>
          <div className="col" id="waveform" />
        </div>
      </div>
    );
  }
};

export default connect(null, {playSong})(Waveform);