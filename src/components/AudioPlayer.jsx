import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaded } from '../actions/trackControlsActions';
import  { setSongPosition, songLength } from '../actions/scrubBarActions';
import { soundManager } from 'soundmanager2'

// apparently this is a container component
// Subscribes to the 'playing' state

class AudioPlayer extends Component {

  componentDidMount() {
    const self = this;
    soundManager.setup({
      debugMode: true,
      useHTML5Audio: true,
      preferFlash: false,
      stream: true,
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
      this.props.loaded();
      const existingSong = soundManager.getSoundById(id);
      if (existingSong) {
        soundManager.setPosition(id, 0)
        soundManager.play(id);
      } else {
        soundManager.createSound({
          // optional id, for getSoundById() look-ups etc. If omitted, an id will be generated.
          id: id,
          url: songUrl,
          autoPlay: true,
          whileloading: function () { console.log(this.id + ' is loading'); },
          whileplaying: function () {
            self.props.setSongPosition(this.position);
          },
        });
      }
    })
  }

  // this will watch for any new songs loaded, any changes in the trackControl state?
  componentDidUpdate(prevProps) {
    if (!this.props.auth.isAuthenticated) {
      soundManager.stopAll();
    }

    if (this.props.currSong.song && this.props.currSong.song.signedUrl) {
      const { _id, length } = this.props.currSong.song;
      const songUrl = this.props.currSong.song.signedUrl;
      if (prevProps.currSong.song._id === _id) {
        this.props.trackControls.isPlaying ? soundManager.resume(_id) : soundManager.pause(_id);
        if (prevProps.trackControls.playFromPosition !== this.props.trackControls.playFromPosition) {
          soundManager.setPosition(_id, this.props.trackControls.playFromPosition)
        }
      } else {
        soundManager.stopAll();
        this.props.songLength(length);
        this.handleSongLoad(_id, songUrl);
      }
    }
  }

  render() {
    return (
      <div/>
    );
  }
};

function mapStateToProps(state) {
  const { currSong, trackControls, auth } = state;
  return {
    currSong,
    trackControls,
    auth
  }
}

export default connect(mapStateToProps, { loaded, setSongPosition, songLength })(AudioPlayer);