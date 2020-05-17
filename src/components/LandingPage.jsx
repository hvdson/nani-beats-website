import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
const isEmpty = require('is-empty');

class LandingPage extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>
                {/* {renderUser(user)} */}
                  Your next hit is waiting.
              </h1>

              <h3>
                UNLIMITED Beats for artists, all at your fingertips.
                <br/>
                Every month.
              </h3>
              <button className="btn btn-lg btn-danger">
                Start Your FREE MONTH
              </button>
              <p>
                Then monthly for less than the price of your phone bill.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function renderUser(user) {
  if (!isEmpty(user)) {
    return (<b> Hey there, {user.name.split(" ")[0]} </b>)
  } else {
    return (<div>No User</div>)
  }
}

LandingPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(LandingPage);