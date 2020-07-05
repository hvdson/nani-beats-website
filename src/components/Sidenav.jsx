import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Sidenav extends PureComponent {
  render() {
    return (
      <div className="sidenav" id="sidebar">
        <h3>Admin Dashboard</h3>
        <Link to="/admin/upload">
          <h4>Upload</h4>
        </Link>

        <Link to="/">
          <h4>Create Playlist</h4>
        </Link>
      </div>
    );
  }
}

export default Sidenav;