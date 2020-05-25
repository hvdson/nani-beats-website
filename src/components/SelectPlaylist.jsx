import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrPlaylist, getPlaylists } from '../actions/playlistActions';
import PropTypes from 'prop-types';


class SelectPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      playlist: {},
    }
    this.selectCurrPlaylist = this.selectCurrPlaylist.bind(this);
  }

  componentDidMount() {
    this.props.getPlaylists();
  }

  selectCurrPlaylist(e) {
    const elemId = e.target.parentElement.parentElement.id;
    console.log(typeof this.props.setCurrPlaylist);
    this.props.setCurrPlaylist(elemId);
    this.props.history.push('/web-player/playlists/view');
  }


  // TODO: every playlist card should have play-pause functionality as well
  renderCard(key, playlist) {
    return (
      <div className="card playlist-card col-2" id={key}>
        <h4 className="card-title">{playlist.name}</h4>
        <div className="playlist-img-overlay">
          <img className="card-img-top" src={playlist.imgThumbUrl || null} alt="card-cap" />
          <div className="playlist-play-layer" onClick={this.selectCurrPlaylist}>
            {/* <i className="far fa-play-circle fa-3x playlist-play" />  */}
          </div>
        </div>
        <p className="card-text">{playlist.description}</p>
      </div>
    )
  }


  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.playlists !== this.props.playlists) {
  //     const newPlaylists = this.props.playlists.allPlaylists;
  //     const keys = Object.keys(newPlaylists);
  //     this.setState({playlist: newPlaylists[keys[0]]});
  //   }
  // }

  render() {
    const allPlaylists = this.props.playlists.allPlaylists;
    const keys = Object.keys(allPlaylists);
    console.log(keys);
    return (
      <div className="select-playlist">
        <h1>Playlists</h1>
        <div className="container">
          <div className="row p-3">
            {keys.map((key => {
              return (this.renderCard(key, allPlaylists[key]));
            }))}
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  playlists: state.playlists
})

export default connect(mapStateToProps, { setCurrPlaylist, getPlaylists })(withRouter(SelectPlaylist));