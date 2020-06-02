import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
import axios from "axios";
import { playSong, pauseSong, togglePlay, loaded } from '../actions/actions';
import { loadSong, getSongUrl } from '../actions/songActions'
import { setCurrPlaylist } from '../actions/playlistActions';

//TODO: update playlist to create forEACH song in playlist received

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlist: {}
    }
  }

  /**
    @function createTrack returns a song component to be rendered in React
    @param {track} String url of song.mp3
  */
  createTrack = (track) => {
    return (
      <div className="row">
        <div className="col-md-3" onClick={() => this.props.loadSong(track)}>
          <i className="far fa-play-circle fa-3x"></i>
        </div>
        <h2 className="col-md-9">
          blah
        </h2>
      </div>
    )
  }

  createPlaylist = (playlist) => {
    const songs = this.createTrack('test');
    return (songs);
  }

  // this needs to dispatch action to get the signedUrl from s3
  // THEN press play.
  handlePlaylistPlay(songObj) {
    // check if the current song is loaded
    if (this.props.trackControls.isLoaded) {
      this.props.playSong();
    } else {
      // dispatch an action to *LOAD_SONG*
      console.log(songObj.s3Key);
      this.props.getSongUrl(songObj);
      // this.props.loadSong(val);
      // this.props.playSong();
    }
  }

  getDate(dateAdded){
    console.log(dateAdded);
    const time = (new Date(dateAdded * 1)).toLocaleDateString();
    return time
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.setCurrPlaylist(id);
  }

  render() {
    if (this.props.playlists.currPlaylist.songs) {
      return (
        <div className="row">
          <div id="playlist-container" className="col">
            <div>
              <h1>{this.props.playlists.currPlaylist.name}</h1>
            </div>
            <table className="song-container container-fluid">
              {renderPlaylistHeaders()}
              {this.props.playlists.currPlaylist
                ? renderPlaylistItems(this, this.props.playlists.currPlaylist)
                : null
              }
            </table>
          </div>
        </div>
      )
    }
    return <div/>
  }
};

function renderPlaylistHeaders() {
  return (
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col" />
        <th scope="col">Artists</th>
        <th scope="col">Title</th>
        <th scope="col">BPM</th>
        <th scope="col">Key</th>
        <th scope="col">Length</th>
        <th scope="col">Date Added</th>
        <th scope="col">Tags</th> 
        <th scope="col">Download</th>
      </tr>
    </thead>
  )
}

// TODO: song.src should be song.s3Key
function renderPlaylistItems(self, playlist) {
  return ( 
    <tbody>
      {playlist.songs.map((song, idx) => {
      return (
        <tr key={idx}>
          <th className="play-button">
            {renderPlayPause(self, song)}
          </th>
          <td>
            <img src={song.imgThumbUrl} alt="cloutkirby" className="img-thumbnail"/>
          </td>
          <td className="song-artistsType">
            {song.artistsType.map((artist) => {
              return (
                <li>{artist}</li>
              )
            })}
          </td>
          <td className="song-title">
            {song.title}
          </td>
          <td className="song-bpm">
            {song.bpm}
          </td>

          <td className="song-key">
            {song.key}
          </td>

          <td className="song-length">
            {song.length}
          </td>

          <td className="song-dateAdded">
            {self.getDate(song.dateAdded)}
          </td>

          <td className="song-tags">
            {song.tags.map((tag) => {
              return (
                <li>{tag}</li>
              )
            })}
          </td>
          <td className="song-download">
            <i className="far fa-download fa-2x" onClick={() => self.handlePlaylistPlay()} />
          </td>
        </tr>
      )})}
    </tbody>
  )
}

function renderPlayPause(self, songObj) {
    if (self.props.trackControls.isPlaying && self.props.currSong.song._id === songObj._id ) {
      console.log('inside')
      return (<i className="far fa-pause-circle fa-3x" onClick={() => self.handlePlaylistPlay(songObj)} />)
    }
    return (<i className="far fa-play-circle fa-3x" onClick={() => self.handlePlaylistPlay(songObj)} />)
}

function mapStateToProps(state) {
  const { trackControls, currSong, playlists } = state;
  return {
    trackControls,
    currSong,
    playlists
  }
}

export default connect(mapStateToProps, { loaded, playSong, pauseSong, loadSong, togglePlay, setCurrPlaylist, getSongUrl })(Playlist);