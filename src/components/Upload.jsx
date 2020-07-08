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
      keyLetter: "",
      keyScale: "",
      length: "",
      tags: "",
      imgFile: "",
      audioFile: "",
      // imgFileInput: null,
      // audioFileInput: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.audioFileInput = React.createRef();
    this.imgFileInput = React.createRef();
  }

  handleChange(e) {
    if (e.target.id === "imgFile") {
      let img = this.imgFileInput.current.files[0];
      this.setState({ [e.target.id]: URL.createObjectURL(img)});
    } else if (e.target.id === "audioFile") {
      let audio = this.audioFileInput.current.files[0];
      this.setState({ [e.target.id]: URL.createObjectURL(audio) });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
    console.log(this.audioFileInput.current.files[0])
    console.log(this.imgFileInput.current.files[0])
  }

  // handleChange(e) {
  //   if (e.target.id === "imgFile") {
  //     let img = e.target.files.path;
  //     this.setState({ [e.target.id]: URL.createObjectURL(img) });
  //   } else if (e.target.id === "audioFile") {
  //     this.setState({ [e.target.id]: e.target.files });
  //   } else {
  //     this.setState({ [e.target.id]: e.target.value });
  //   }
  // }

      //   title: this.state.title,
      // artistsType: this.state.artistsType,
      // bpm: this.state.bpm,
      // key: this.state.keyLetter + this.state.keyScale,
      // length: this.state.length,
      // tags: this.state.tags,
      // imgFile: this.imgFileInput.current.files[0],
      // audioFile: this.audioFileInput.current.files[0]

  handleSubmit(e) {
    e.preventDefault();
    const newSong = new FormData();
    newSong.append('title', this.state.title,)
    newSong.append('artistsType', this.state.artistsType)
    newSong.append('bpm', this.state.bpm)
    newSong.append('key', this.state.keyLetter + this.state.keyScale)
    newSong.append('length', this.state.length)
    newSong.append('tags', this.state.tags)
    newSong.append('imgFile', this.imgFileInput.current.files[0])
    newSong.append('audioFile', this.audioFileInput.current.files[0])
      
      
      
      
      
    this.props.adminUploadSong(newSong, this.props.history);
    // console.log(this.state)
    // console.log(this.imgFileInput.current.files[0])
    // console.log(this.audioFileInput.current.files[0])

  }

  // readURL(input) {
  //   if (this.imgFileInput.current.files && this.imgFileInput.current.files[0]) {
  //   const reader = new FileReader();
  
  //   reader.onload = function (e) {
  //     $('#blah').attr('src', e.target.result);
  //   }

  //   reader.readAsDataURL(input.files[0]); // convert to base64 string
  // }

  render() {
    return (
      <div className="col-6">
        <h1>Upload</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="title">Title</label>
            <input className="form-control" id="title" aria-describedby="titleHelp" onChange={this.handleChange} value={this.state.title} required/>
          </div>
          
          <div className="form-group">
            <label for="artists">Artists</label>
            <input className="form-control" id="artistsType" aria-describedby="artistsHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.aristsType} required/>
          </div>

          <div className="form-group">
            <label for="BPM">BPM</label>
            <input className="form-control" id="bpm" aria-describedby="bpmHelp" onChange={this.handleChange} value={this.state.bpm} required/>
          </div>

          <div class="form-group">
            <label for="key">Key</label>
            <div class="row d-flex justify-content-around">
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
            <label for="length">Length</label>
            <input className="form-control" id="length" aria-describedby="lengthHelp" onChange={this.handleChange} value={this.state.length} required/>
          </div>

          <div className="form-group">
            <label for="tags">Tags</label>
            <input className="form-control" id="tags" aria-describedby="tagHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.tags} required/>
          </div>

          <div className="form-group">
            <label for="img">Select image:</label>
            <input type="file" id="imgFile" name="imgFile" accept="image/*" ref={this.imgFileInput} onChange={this.handleChange}/>
            {this.state.imgFile !== ""
              ? <img className="song-img-file" src={this.state.imgFile} alt="song thumb" />
              : null
            }
          </div>

          <div className="form-group">
            <label for="song">Select song:</label>
            <input type="file" id="audioFile" name="audioFile" accept="audio/*" ref={this.audioFileInput} onChange={this.handleChange}/>
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