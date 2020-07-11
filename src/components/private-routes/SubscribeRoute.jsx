import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SubscribeRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isAuthenticated === true && auth.user.isSubscribed === false) {
        return <Component {...props} />
      } else {
        return <Redirect to="/" />
      }
    }}
  />
);

SubscribeRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SubscribeRoute);