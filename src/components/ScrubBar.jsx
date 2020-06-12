import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrubBarFiller from './ScrubBarFiller';
import { playFromPosition } from '../actions/trackControlsActions';

// components
class ScrubBar extends Component {
  constructor(props) {
    super(props);
    this.handleScrub = this.handleScrub.bind(this);
  }

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

    if (seconds_int < 10) {
      return minutes + ':' + '0' + seconds;
    }
    return minutes + ':' + seconds;
  }


  handleScrub(e) {
    const clickedSpot = e.nativeEvent.offsetX;
    const totalWidth = e.nativeEvent.target.clientWidth;
    const rawPosition = Math.floor((clickedSpot/totalWidth) * this.minSecToMs(this.props.scrubBar.length));
    this.props.playFromPosition(rawPosition);
  }

  render() {
    return (
      <div className="col-6 d-flex align-items-center" id="scrub-bar-component"> 
        <div className="col justify-content-center">
          <span>{this.currTime(this.props.scrubBar.position)}</span>
        </div>
        <div className="col-10 scrub-bar-click-wrapper" onMouseUp={this.handleScrub}>
          <div className="scrub-bar">
            <ScrubBarFiller minSecToMs={this.minSecToMs} songMsToMinSec={this.songMsToMinSec}/>
          </div>
        </div>
        <div className="col justify-content-center">
          <span>{this.timeLeft(this.props.scrubBar.length, this.props.scrubBar.position)}</span>
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

export default connect(mapStateToProps, { playFromPosition })(ScrubBar);