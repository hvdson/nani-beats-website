import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
class ScrubBar extends Component {

  render() {
    return (
      <div className="col" id="scrub-bar">
        skrrrt
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currSong } = state;
    return {
      position: currSong.position
  }
}

export default connect(mapStateToProps, null)(ScrubBar);