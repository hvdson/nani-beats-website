import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      artistsType: "",
      bpm: 0,
      key: "",
      length: "",
      tags: "",
      imgFile: "",
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
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
    console.log(this.imgFileInput.current)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    console.log(this.imgFileInput.current.files[0])
    console.log(this.audioFileInput.current.files[0])
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="title">Title</label>
            <input className="form-control" id="title" aria-describedby="titleHelp" onChange={this.handleChange} value={this.state.title}/>
          </div>
          
          <div className="form-group">
            <label for="artists">Artists</label>
            <input className="form-control" id="artistsType" aria-describedby="artistsHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.aristsType}/>
          </div>

          <div className="form-group">
            <label for="BPM">BPM</label>
            <input className="form-control" id="bpm" aria-describedby="bpmHelp" onChange={this.handleChange} value={this.state.bpm}/>
          </div>

          <div className="form-group">
            <label for="key">Key</label>
            <input className="form-control" id="key" aria-describedby="keyHelp" onChange={this.handleChange} value={this.state.key}/>
          </div>

          <div className="form-group">
            <label for="length">Length</label>
            <input className="form-control" id="length" aria-describedby="lengthHelp" onChange={this.handleChange} value={this.state.length}/>
          </div>

          <div className="form-group">
            <label for="tags">Tags</label>
            <input className="form-control" id="tags" aria-describedby="tagHelp" placeholder="Seperate by comma - E.g: Deez, Nutz" onChange={this.handleChange} value={this.state.tags}/>
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
            <input type="file" id="audioFile" name="audioFile" accept="audio/*"/>
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