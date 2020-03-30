import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteInner = ({
  component: Component,
  auth,
  redirectURL = "/login",
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectURL} />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteInner);

export default PrivateRoute;
