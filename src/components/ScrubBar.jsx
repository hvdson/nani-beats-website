import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrubBarFiller from './ScrubBarFiller';

// components
class ScrubBar extends Component {
  timeLeft(length, currPos) {
    // todo: fix bug where timeLeft shows negative value - prob todo with lengthMs - currPos < 0 when it reaches end of song
    if (length && currPos) {
      const lengthMs = this.minSecToMs(length);
      const timeLeft = this.songMsToMinSec(lengthMs - currPos);
      return timeLeft;
    }
    return null;
  }

  currTime(pos) {
    if (pos) {
      return this.songMsToMinSec(pos);
    }
  }

  minSecToMs(length) {
    const minSecSplit = length.split(':');
    const mins = minSecSplit[0] * 60000
    const secs = minSecSplit[1] * 1000
    return mins + secs;
  }
    
  songMsToMinSec(ms) {
    const length = ms / 1000
    const minutes = Math.floor(length / 60),
    seconds_int = Math.floor(length - minutes * 60),
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2)
    console.log(seconds_int)

    if (seconds_int < 10) {
      return minutes + ':' + '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div className="col-8 d-flex align-items-center" id="scrub-bar-component"> 
        <div className="col-1">
          {this.currTime(this.props.scrubBar.position)}
        </div>
        <div className="col-8 scrub-bar">
          <ScrubBarFiller minSecToMs={this.minSecToMs} songMsToMinSec={this.songMsToMinSec}/>
        </div>
        <div className="col-1">
          {this.timeLeft(this.props.scrubBar.length, this.props.scrubBar.position)}
        </div>
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  const { scrubBar } = state;
    return {
      scrubBar
  }
}

export default connect(mapStateToProps, null)(ScrubBar);