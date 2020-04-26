import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Waveform from './components/Waveform.jsx';
import Playlist from './components/Playlist.jsx';

const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: url,
      isPlaying: false,
    }
    this.setSong = this.setSong.bind(this);
    this.getSong = this.getSong.bind(this);
    this.setPlay = this.setPlay.bind(this);
  }

  setSong = (file) => {
    console.log(`setting:`, file)
    this.setState({song: file});
  }

  getSong = () => {
    console.log(`i got ${this.state.song}`)
    return this.state.song;
  }

  setPlay = () => {
    console.log('setting play');
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <Waveform isPlaying={this.state.isPlaying} setPlay={this.setPlay} song={this.state.song}/>
        <Playlist setSong={this.setSong}/>
      </div>
    );
  }
}

export default App;
