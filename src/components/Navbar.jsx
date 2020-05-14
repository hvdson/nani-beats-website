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
            <Link to="/web-player">
              <span className="nav-link">My Account</span>
            </Link>
          </div>
        </div>
        
        
        <Link to="/" className="col-8" >
          <img id="logo-img" alt="nani-beats-logo" src={nanibeats} />
        </Link>
        
        <div className="col">
          <Link to="/login">
            <button className="btn btn-outline-danger" type="button">Login</button>
          </Link>

          <Link to="/register" className="col-8" >
            <button className="btn btn-outline-danger" type="button">Register</button>
          </Link>


        </div>
        
      </nav>
    );
  }
}

export default Navbar;
