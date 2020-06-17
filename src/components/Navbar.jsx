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

  renderAuthButtons() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          {this.buttonMaker(null, 'Logout', true)}
        </div>
      )
    } else {
      return (
        <div>
          {this.buttonMaker('/login', 'Login')}
          {this.buttonMaker('/register', 'Register')}
        </div>
      )
    }
  }

  buttonMaker(link, text, isLogout = null) {
    if (isLogout) {
      return (
        <button onClick={this.onLogoutClick} className="btn btn-outline-danger">
          {text}
        </button>        
      )
    } else {
      return (
        <Link to={link}>
          <button className="btn btn-outline-danger" type="button">{text}</button>
        </Link>
      )
    }
  }

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
          {this.renderAuthButtons()}
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