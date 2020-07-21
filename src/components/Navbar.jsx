import React, { Component } from 'react';
import nanibeats from '../assets/nanibeatslogo.png'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    return <Redirect to="/" />
  };

  renderAuthButtons() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="btn-group">
          <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-user fa-2x brand-color"></i>
              {this.props.auth.user.email}
            </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/web-player">Web Player</a>
            <a className="dropdown-item" href="/web-player">My Account</a>
            <div className="dropdown-divider"></div>
            <div>
              {this.buttonMaker(null, 'Logout', true)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.buttonMaker('/login', 'Login')}
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
        <div className="col-2 align-middle">
          {this.props.auth.user.role === "admin" ? this.buttonMaker('/admin', 'Admin') : null}
        </div>
        
        <Link to="/web-player" className="col-8" >
          <img id="logo-img" alt="nani-beats-logo" src={nanibeats} />
        </Link>
        
        <div className="col-2 align-middle">
          
          <div className="justify-content-center row">
            {/* <Link to="/web-player">
              <span className="">{this.props.auth.user.name}</span>
              <span className="nav-link">My Account</span>
            </Link>
             */}
          </div>
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