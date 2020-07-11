import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SubscribePlans from './SubscribePlans';
import Payment from './Payment';

class Subscribe extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container-fluid">
        {/* {this.setScreen()} */}
        {/* <Link to={`${this.props.match.path}/playlists`}>Select Playlist</Link>
          <Link to="/web-player/playlists/view">View Playlist</Link> */}
        <Switch>
          <Route exact path={`${this.props.match.path}`} component={SubscribePlans} />
          <Route path={`${this.props.match.path}/payment`} component={Payment} />
        </Switch>
      </div>
    );
  }
}

Subscribe.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null,
)(Subscribe);