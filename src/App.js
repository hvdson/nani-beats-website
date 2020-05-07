import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';

import url2 from './assets/test.mp3';
import nanibeats from './assets/nanibeatslogo.png'
import cloutKirby from './assets/cloutkirby.jpg'

const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';

const monahSongObj = {
  id: "hashnum69",
  src: "url",
  imgThumbSrc: cloutKirby,
  artistsType: ["Lance The Wrapper", "Drake", "Post Malone"],
  title: "Monahh",
  bpm: 69,
  key: "A#",
  length: "2:50",
  dateAdded: Date.now(),
  tags: ["dank beat", "neat", "heat", "🔥"]
}

class App extends Component {
  constructor(props) {
    super(props);
    // TODO: refactor code to use this
    // this.state = {
    //   // playlist: {
    //   //   id: "hashedplaylistid69",
    //   //   name: "Nani Picks",
    //   //   songs: [monahSongObj]
    //   // }
    // }
    
    this.state = {
      playlist: [url, url2]
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container-fluid">
              <img id="logo-img" alt="nani-beats-logo" className="col" src={nanibeats}/>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2" id="sidebar">
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
