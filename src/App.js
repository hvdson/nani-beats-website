import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Waveform from './components/Waveform.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mp3: null,
    }
  }

  setmp3file = (file) => {
    this.setState({mp3: file});
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
        
        <Waveform mp3={this.state.mp3}/>
      </div>
    );
  }
}

export default App;
