import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import Sidenav from "./Sidenav";
import Upload from "./Upload";

class AdminDashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <Sidenav/>
        <div className="container d-flex justify-content-center">
          <Switch>
            <Route exact path={`${this.props.match.path}/upload`} component={Upload} />
          </Switch>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminDashboard);