// import soundManager from 'soundmanager2';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loaded, notLoaded, togglePlay, playSong } from '../actions/actions';
import  { setSongPosition } from '../actions/scrubBarActions';
import { soundManager } from 'soundmanager2'
soundManager['progress'] = 0;

// apparently this is a container component
// Subscribes to the 'playing' state

class AudioPlayer extends Component {

  componentDidMount() {
    const self = this;
    soundManager.setup({
      debugMode: true,
      useHTML5Audio: true,
      preferFlash: false,
      url: '/path/to/swf-directory/',
      ontimeout: function () {
        // Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue
        console.log('error!');
      }
    })
  }



  handleSongLoad(id, songUrl) {
    const self = this;
    soundManager.onready(() => {
      soundManager.createSound({
        // optional id, for getSoundById() look-ups etc. If omitted, an id will be generated.
        id: id,
        url: songUrl,
        whileloading: function () { console.log(this.id + ' is loading'); },
        whileplaying: function () {
          // 1 second
          // console.log(this.position)
          self.props.setSongPosition(this.position);
        }
      });
      soundManager.play(id)
    })
  }

  // this will watch for any new songs loaded, any changes in the trackControl state?
  componentDidUpdate(prevProps) {
    // NEW CODE
    // const currSong = this.props.currSong.song;
    // console.log('currsong');
    // console.log(currSong)
    // const prevSongObjKeys = Object.keys(prevProps.currSong.song).length;
    // const currSongObjKeys = Object.keys(currSong).length;
    // // 1. check if it's a new song with a url
    // if (prevSongObjKeys > 0 && currSongObjKeys > 0) {
    //   if (currSong._id !== prevProps.currSong.song._id && currSong.signedUrl) {
    //     console.log(currSong.signedUrl)
    //     console.log('inside')
    //     // load song into api
    //     this.handleSongLoad(currSong.songId, currSong.songUrl);
    //     // this.props.loaded();
    //     // it's the same song - check ifPLaying or paused
    //   } else if (this.props.trackControls.isPlaying) {
    //     soundManager.play(currSong.songId);
    //   } else if (!this.props.trackControls.isPlaying) {
    //     // soundManager.pause();
    //   }
    // }

    // OLD CODE
    if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
      const { _id } = this.props.currSong.song;
      console.log(_id);
      const songUrl = this.props.currSong.song.signedUrl;
      // TODO: THIS WILL ALWAYS RUN FIXIT
      if (prevProps.currSong.song && prevProps.currSong.song._id === _id) {
        // soundManager.pause(_id);
        // console.log('blah')
      } else {
        this.handleSongLoad(_id, songUrl);
      }
    }
  }

  renderScrubBar() {
    return (
      <h1>{soundManager.progress}</h1>
    )
  }

  render() {
    return (
      <div className="col">
        {this.props.isLoaded ? this.renderScrubBar() : <span>Loading!</span>}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { currSong, trackControls } = state;
  return {
    currSong,
    trackControls,
  }
}

export default connect(mapStateToProps, { loaded, notLoaded, togglePlay, playSong, setSongPosition })(AudioPlayer);