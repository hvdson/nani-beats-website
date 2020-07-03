import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { logoutUser } from "../actions/authActions";
const isEmpty = require('is-empty');

class LandingPage extends Component {

  render() {
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>
                Admin Dashboard
              </h1>
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