import React, { PureComponent } from 'react';
import axios from "axios";

class SelectPlaylist extends PureComponent {
  constructor() {
    super();
    this.state = {
      playlist: {
        songs: []
      },
    }
  }

  callPlaylistAPI = async () => {
    const res = await axios.get('/api/playlists/all');
    const body = await res.data;
    if (res.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    return (body);
  }

  componentDidMount() {
    this.callPlaylistAPI()
      .then(res => this.setState((prevState) => ({
        playlist: {
          ...prevState.playlist,
          songs: [...prevState.playlist.songs, res]
        }
      })))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="select-playlist">
        <h1>Playlists</h1>
      </div>
    );
  }
}

export default SelectPlaylist;