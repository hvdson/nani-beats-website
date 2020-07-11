import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isAuthenticated === true && (auth.user.isSubscribed === true || auth.user.role === 'admin')) {
        return <Component {...props} />
      } else if (auth.user.isSubscribed === false) {
        return <Redirect to="/subscribe" />
      } else {
        return <Redirect to="/login" />
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);