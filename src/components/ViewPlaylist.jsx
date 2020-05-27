import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { connect } from 'react-redux';
import axios from "axios";
import { playSong, pauseSong, togglePlay } from '../actions/actions';
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
  handlePlaylistPlay(val) {
    // check if the current song is loaded
    console.log(val);
    if (this.props.currSong.src === val && this.props.isLoaded) {
      this.props.togglePlay();
    } else {
      // dispatch an action to *LOAD_SONG*
      this.props.getSongUrl(val);
      // this.props.loadSong(val);
      // this.props.playSong();
    }
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
            {renderPlayPause(self, song.s3Key)}
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
            {song.dateAdded}
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

function renderPlayPause(self, val) {
    if (self.props.isPlaying && self.props.currSong.src === val ) {
      return (<i className="far fa-pause-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
    }
    return (<i className="far fa-play-circle fa-3x" onClick={() => self.handlePlaylistPlay(val)} />)
}

function mapStateToProps(state) {
  const { isPlaying, currSong, isLoaded, playlists } = state;
  return {
    isPlaying,
    currSong,
    isLoaded,
    playlists
  }
}

export default connect(mapStateToProps, { playSong, pauseSong, loadSong, togglePlay, setCurrPlaylist, getSongUrl })(Playlist);