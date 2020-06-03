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
  render() {
    return (
      <div className="col" id="scrub-bar">
        {this.props.scrubBar.position}
        {this.props.scrubBar.length}
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