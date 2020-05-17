import React, { Component } from 'react';
import nanibeats from '../assets/nanibeatslogo.png'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

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
          <div className="row">
            <Link to="/login">
              <button className="btn btn-outline-danger" type="button">Login</button>
            </Link>

            <Link to="/register" >
              <button className="btn btn-outline-danger" type="button">Register</button>
            </Link>
            
            <button onClick={this.onLogoutClick} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);