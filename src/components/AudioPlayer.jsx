// import soundManager from 'soundmanager2';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { WaveformContainer, Wave, PlayButton } from '../assets/Waveform.styled';
import { loaded, notLoaded, togglePlay } from '../actions/actions'
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
          soundManager.progress = this.position/this.duration*100;
        }
      });
      soundManager.play()

    })
    this.props.loaded();
    this.props.togglePlay();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
      const { _id } = this.props.currSong.song;
      console.log(_id);
      const songUrl = this.props.currSong.song.signedUrl;
      // const prevSong = prevProps.currSong.song.signedUrl;
      const isLoaded = this.props.isLoaded;
      const prevSong = prevProps.currSong.song;

      if (prevProps.currSong.song && prevProps.currSong.song._id === _id) {
        soundManager.togglePause(_id);
      } else {
        this.props.notLoaded();
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
  const { currSong, isPlaying, isLoaded, isFetching } = state;
  return {
    currSong,
    isPlaying,
    isLoaded,
    isFetching
  }
}

export default connect(mapStateToProps, { loaded, notLoaded, togglePlay })(AudioPlayer);