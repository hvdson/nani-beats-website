import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
class ScrubBarFiller extends Component {
  constructor(){
    super();    
    this.state = {
      percentage: 0
    }
    // this.handleScrub = this.handleScrub.bind(this)
  }


  songPositionPercentage() {
    if (this.props.scrubBar.length && this.props.scrubBar.position) {
      const { position, length } = this.props.scrubBar;
      const lengthMs = this.props.minSecToMs(length);
      return (position / lengthMs * 100);
    }
    return 0;
  }

  render() {
    const currPos = this.songPositionPercentage();
    return (
      <div className="filler" id="progress-bar-filler" style={{ width: `${currPos}%` }} />
    );
  }
}

function mapStateToProps(state) {
  const { scrubBar } = state;
  return {
    scrubBar
  }
}

export default connect(mapStateToProps, null)(ScrubBarFiller);