import React, { PureComponent } from 'react';
import axios from "axios";

import { connect } from 'react-redux';
import { setCurrPlaylist } from '../actions/playlistActions';
import PropTypes from 'prop-types';

class SelectPlaylist extends PureComponent {
  constructor() {
    super();
    this.state = {
      playlist: {},
    }
  }

  // callPlaylistAPI = async () => {
  //   const res = await axios.get('/api/playlists/all');
  //   const body = await res.data;
  //   if (res.status !== 200) {
  //     throw Error(body.message);
  //   }
  //   console.log(body);
  //   return (body);
  // }

  // componentDidMount() {
  //   this.callPlaylistAPI()
  //     .then(res => this.setState((prevState) => ({
  //       playlist: {
  //         ...prevState.playlist,
  //         songs: [...prevState.playlist.songs, res]
  //       }
  //     })))
  //     .catch(err => console.log(err))
  // }

  renderCard() {
    return (
      <div className="card playlist-card col-2">
        <h4 class="card-header">{this.state.playlist.name}</h4>
        <img className="card-img-top" src={this.state.playlist.imgThumbUrl || null} alt="card-cap" />
        <div className="card-body">
          <p className="card-text">{this.state.playlist.description}</p>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlists !== this.props.playlists) {
      const newPlaylists = this.props.playlists.allPlaylists;
      const keys = Object.keys(newPlaylists);
      this.setState({playlist: newPlaylists[keys[0]]});
    }
  }

  render() {
    return (
      <div className="select-playlist">
        <h1>Playlists</h1>
        <div className="container">
          <div className="row p-3 justify-content-between">
            {this.renderCard()}
            {this.renderCard()}
            {this.renderCard()}
            {this.renderCard()}
            {this.renderCard()}
          </div>
          <div className="row p-3 justify-content-between">
            {this.renderCard()}
            {this.renderCard()}
            {this.renderCard()}
            <div className="col-2"></div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
})

export default connect(mapStateToProps, { setCurrPlaylist })(SelectPlaylist);