import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { adminUploadSong } from '../actions/admin/uploadActions'

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      artistsType: "",
      bpm: 0,
      keyLetter: "C",
      keyScale: "Major",
      length: "",
      tags: "",
      imgFileUrl: "",
      imgFile: null,
      audioFileUrl: "",
      audioFile: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.imgFileInput = this.imgFileInput.bind(this);
    // this.audioFileInput = this.audioFileInput.bind(this);
    // this.imgFileInput = React.createRef();
    // this.audioFileInput = React.createRef();
  }

  handleFile(e, urlName) {
    let file = e.target.files[0]
    this.setState({ 
      [e.target.id]: file,
      [urlName]: URL.createObjectURL(file)
    });
  }

  handleChange(e) {
    if (e.target.id === "imgFile") {
      this.handleFile(e, "imgFileUrl")
    } else if (e.target.id === "audioFile") {
      this.handleFile(e, "audioFileUrl")
    } else {
      console.log(e.target.id)
      console.log(e.target.value)
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const newSong = new FormData();
    newSong.append('title', this.state.title,)
    newSong.append('artistsType', this.state.artistsType)
    newSong.append('bpm', this.state.bpm)
    newSong.append('key', (this.state.keyLetter + " " + this.state.keyScale))
    newSong.append('length', this.state.length)
    newSong.append('tags', this.state.tags)
    newSong.append('imgFile', this.state.imgFile)
    newSong.append('audioFile', this.state.audioFile)
    for (var value of newSong.values()) {
      console.log(value);
    }
    this.props.adminUploadSong(newSong, this.props.history);
  }

  render() {
    return (
      <div className="col-6">
        <h1>Upload</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input className="form-control" id="title" aria-describedby="titleHelp" onChange={this.handleChange} value={this.state.title} required/>
          </div>
          
          <div className="form-group">
            <label htmlFor="artists">Artists</label>
            <input className="form-control" id="artistsType" aria-describedby="artistsHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.aristsType} required/>
          </div>

          <div className="form-group">
            <label htmlFor="BPM">BPM</label>
            <input className="form-control" id="bpm" aria-describedby="bpmHelp" onChange={this.handleChange} value={this.state.bpm} required/>
          </div>

          <div className="form-group">
            <label htmlFor="key">Key</label>
            <div className="row d-flex justify-content-around">
              <select className="form-control col-4" id="keyLetter" onChange={this.handleChange} value={this.state.keyLetter} required>
                <option>C</option>
                <option>C#/Db</option>
                <option>D</option>
                <option>D#/Eb</option>
                <option>E</option>
                <option>F</option>
                <option>F#/Gb</option>
                <option>G</option>
                <option>G#/Ab</option>
                <option>A</option>
                <option>A#/Bb</option>
                <option>B</option>
              </select>
              <select className="form-control col-4" id="keyScale" onChange={this.handleChange} value={this.state.keyScale} required>
                <option>Major</option>
                <option>Minor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="length">Length</label>
            <input className="form-control" id="length" aria-describedby="lengthHelp" onChange={this.handleChange} value={this.state.length} required/>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input className="form-control" id="tags" aria-describedby="tagHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.tags} required/>
          </div>

          <div className="form-group">
            <label htmlFor="img">Select image:</label>
            <input type="file" id="imgFile" name="imgFile" accept="image/*" ref={this.imgFileInput} onChange={this.handleChange}/>
            {this.state.imgFileUrl !== ""
              ? <img className="song-img-file" src={this.state.imgFileUrl} alt="song thumb" />
              : null
            }
          </div>

          <div className="form-group">
            <label htmlFor="song">Select song:</label>
            <input type="file" id="audioFile" name="audioFile" accept="audio/*" ref={this.audioFileInput} onChange={this.handleChange}/>
            { this.state.audioFileUrl !== ""
              ? <audio controls>
                  <source className="song-file" src={this.state.audioFileUrl} type="audio/mpeg"/>
                </audio>
              : null
            }
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
  { adminUploadSong }
)(withRouter(Upload));