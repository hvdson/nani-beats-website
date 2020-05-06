import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';

import url2 from './assets/test.mp3';
const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: url,
      playlist: [url, url2],
    }
    this.setSong = this.setSong.bind(this);
    this.getSong = this.getSong.bind(this);
  }

  setSong = (file) => {
    console.log(`setting:`, file)
    this.setState({song: file});
  }

  getSong = () => {
    console.log(`i got ${this.state.song}`)
    return this.state.song;
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
            <p>
              Headddd
            </p>
          </header>
          <div className="container">
          <div className="row">
            <div className="col-2">
              <p> this should be the sidebar </p> 
            </div>
            <div className="col">
              <Playlist setSong={this.setSong} playlist={this.state.playlist}/>
            </div>
          </div>

          <Player/>

          {/* <Waveform song={this.state.song}/> */}
        </div>
      </div>
    );
  }
}

export default App;
