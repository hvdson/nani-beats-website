import React, { Component } from 'react';
import { connect } from 'react-redux';
import downloadjs from 'downloadjs';

class DownloadButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDownloading: false
    }
  }

  downloadLink(url, songName) {
    const x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    x.onload = (e) => {
      this.setState({ isDownloading: false })
      downloadjs(e.target.response, songName + '.mp3', 'audio/mpeg');
    }
    x.send();
    // downloadjs(url)
  }

  render() {
    return (
      <div>
        { this.state.isDownloading 
          ? <div className="spinner-border"/> 
          : <i className="far fa-download fa-2x" onClick={() => {
              this.downloadLink(this.props.song.signedUrl, this.props.song.title)
              this.setState({isDownloading: true})
            }} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { playlists } = state;
  return {
    playlists
  }
}

export default connect(mapStateToProps, null )(DownloadButton);
