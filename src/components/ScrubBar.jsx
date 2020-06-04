import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Tracker = styled.div`
  width: 50%;
  height: 20px;
  margin: 15px auto;
  background: #DD2121;
  border-radius: 10px;
`

// components
class ScrubBar extends Component {
  timeLeft(length, currPos) {
    if (length && currPos) {
      const lengthMs = this.minSecToMs(length);
      const timeLeft = this.songMillisecondsToMinSec(lengthMs - currPos);
      return timeLeft;
    }
    return null;
  }

  currTime(pos) {
    if (pos) {
      return this.songMillisecondsToMinSec(pos);
    }
  }

  minSecToMs(length) {
    const minSecSplit = length.split(':');
    const mins = minSecSplit[0] * 60000
    const secs = minSecSplit[1] * 1000
    return mins + secs;
  }

  songMillisecondsToMinSec(ms) {
    const length = ms / 1000
    const minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2)

    if (seconds_int < 10) {
      return minutes + ':' + '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div className="col" id="scrub-bar">
        {this.currTime(this.props.scrubBar.position)}
        {this.timeLeft(this.props.scrubBar.length, this.props.scrubBar.position)}
        {/* <div className="progress"> */}
          {/* <div className="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> */}
        {/* </div> */}
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