import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong, pauseSong, togglePlay, loaded } from '../actions/trackControlsActions';
import { loadSong, getSongUrl } from '../actions/songActions'
import { setCurrPlaylist } from '../actions/playlistActions';
import { loadPlaylistIntoQueue, loadSongsIntoQueue, setCurrSongIdx, setQueueLength } from '../actions/queueActions';
import downloadjs from 'downloadjs';
import axios from 'axios';

//TODO: update playlist to create forEACH song in playlist received

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlist: {}
    }
  }

  /**
   * TODO: refactor to use
    @function createTrack returns a song component to be rendered in React
    @param {track} String url of song.mp3
  */
  createTrack = (track) => {
    return (
      <div className="row" onDoubleClick={this.handlePlaylistPlay}>
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
  handlePlaylistPlay(songObj, idx) {
    // check if the current song is loaded and if it's the same song
    if (songObj._id === this.props.currSong.song._id && this.props.trackControls.isLoaded) {
      this.props.togglePlay();
    
    // DEBUG: This needs to be refactored to be used with Queue
    } else {
      if (this.props.playlists.currPlaylist._id !== this.props.queue.currPlaylistQueueId) {
        this.props.loadPlaylistIntoQueue(this.props.playlists.currPlaylist._id);
        // this.props.loadSongsIntoQueue(this.props.playlists.currPlaylist.songs);
        this.props.setCurrSongIdx(idx)
        this.props.setQueueLength(this.props.playlists.currPlaylist.songs.length)
      }
      // dispatch an action to *LOAD_SONG*
      // this.props.getSongUrl(songObj);
      this.props.loadSong(songObj);
      this.props.playSong();
    }
  }

  getDate(dateAdded){
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
            <table className="song-container table table-dark table-hover table-borderless">
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

// TODO: refactor renderPlayPause to read from currPlaylist.songs idx
// TODO: is it bad to save the whole object?

function renderPlaylistItems(self, playlist) {
  return ( 
    <tbody>
      {playlist.songs.map((song, idx) => {
      return (
        <tr id={idx}>
          <th className="play-button align-middle">
            {renderPlayPause(self, song, idx)}
          </th>
          <td className="align-middle">
            <img src={song.imgThumbUrl} alt="" className="img-thumbnail"/>
          </td>
          <td className="song-artistsType align-middle">
            {song.artistsType.map((artist) => {
              return (
                <li>{artist}</li>
              )
            })}
          </td>
          <td className="song-title align-middle">
            {song.title}
          </td>
          <td className="song-bpm align-middle">
            {song.bpm}
          </td>

          <td className="song-key align-middle">
            {song.key}
          </td>

          <td className="song-length align-middle">
            {song.length}
          </td>

          <td className="song-dateAdded align-middle">
            {self.getDate(song.dateAdded)}
          </td>

          <td className="song-tags align-middle">
            {song.tags.map((tag) => {
              return (
                <li>{tag}</li>
              )
            })}
          </td>
          <td className="song-download align-middle">
            <i className="far fa-download fa-2x" onClick={() => downloadLink(song.signedUrl, song.title)}/>
          </td>
        </tr>
      )})}
    </tbody>
  )
}

function downloadLink(url, songName) {
  console.log('here');
  downloadjs(url)
}

function renderPlayPause(self, songObj, idx) {
    if (self.props.trackControls.isPlaying && self.props.currSong.song._id === songObj._id ) {
      return (<i className="far fa-pause-circle fa-3x" onClick={() => self.handlePlaylistPlay(songObj, idx)} />)
    }
    return (<i className="far fa-play-circle fa-3x" onClick={() => self.handlePlaylistPlay(songObj, idx)} />)
}

function mapStateToProps(state) {
  const { trackControls, currSong, playlists, queue } = state;
  return {
    trackControls,
    currSong,
    playlists,
    queue
  }
}

export default connect(mapStateToProps, 
  { 
    loaded, 
    playSong, 
    pauseSong, 
    loadSong, 
    togglePlay, 
    setCurrPlaylist, 
    getSongUrl,
    loadPlaylistIntoQueue,
    loadSongsIntoQueue,
    setCurrSongIdx,
    setQueueLength
  }
)(Playlist);