// import soundManager from 'soundmanager2';
import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loaded, notLoaded } from '../actions/actions'

import { soundManager } from 'soundmanager2'

const xhr = {
  cache: 'default',
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow',
  referrer: 'client'
};

// apparently this is a container component
// Subscribes to the 'playing' state
class AudioPlayer extends Component {

  componentDidMount() {
    soundManager.setup({

      // where to find the SWF files, if needed
      url: '/path/to/swf-directory/',

      onready: function () {
        // SM2 has loaded, API ready to use e.g., createSound() etc.
        console.log('inside');
      },

      ontimeout: function () {
        // Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue
      }
    })
  }

  render() {
    return (
      <div className="col" id="waveform">
        {this.props.isLoaded ? null : <span>Loading!</span>}
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

export default connect(mapStateToProps, { loaded, notLoaded })(AudioPlayer);