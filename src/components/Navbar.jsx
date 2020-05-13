import React, { Component } from 'react';
import nanibeats from '../assets/nanibeatslogo.png'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      // use <header> if not working
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="col align-middle">
          <div className="justify-content-center row">
            <i className="fas fa-user fa-2x brand-color"></i>
            <a className="nav-link" href="#">My Account</a>
          </div>
        </div>
        <a className="col-8" href="#">
          <img id="logo-img" alt="nani-beats-logo" src={nanibeats} />
        </a>

        <Link>
          <div className="col">
            <button className="btn btn-outline-danger" type="button">Login</button>
          </div>
        </Link>
        
      </nav>
    );
  }
}

export default Navbar;
