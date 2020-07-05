import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Upload extends Component {
  render() {
    return (
      <div className="col-6">
        <form>
          <div className="form-group">
            <label for="title">Title</label>
            <input className="form-control" id="title-input" aria-describedby="titleHelp"/>
          </div>
          
          <div className="form-group">
            <label for="artists">Artists</label>
            <input className="form-control" id="artists-input" aria-describedby="artistsHelp" placeholder="Seperate by comma - E.g: Deez, Nutz"/>
          </div>

          <div className="form-group">
            <label for="BPM">BPM</label>
            <input className="form-control" id="artists-input" aria-describedby="bpmHelp" />
          </div>

          <div className="form-group">
            <label for="key">Key</label>
            <input className="form-control" id="key-input" aria-describedby="keyHelp" />
          </div>

          <div className="form-group">
            <label for="length">Length</label>
            <input className="form-control" id="length-input" aria-describedby="lengthHelp" />
          </div>

          <div className="form-group">
            <label for="tags">Tags</label>
            <input className="form-control" id="tag-input" aria-describedby="tagHelp" placeholder="Seperate by comma - E.g: Deez, Nutz"/>
          </div>

          <div className="form-group">
            <label for="tags">Tags</label>
            Gravatar?
          </div>

          <button type="submit" className="btn btn-danger">Submit</button>
        </form>
      </div>
    );
  }
}

Upload.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Upload);