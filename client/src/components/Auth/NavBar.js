import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/actions/register";
import { connect } from "react-redux";

class NavBar extends Component {
  logOut(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar ">
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {isAuthenticated && user && (
            <>
              <li> {user.name}</li>
              <li>
                <a onClick={this.logOut.bind(this)} className="pointer log-out">
                  Log out
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps, { logoutUser })(NavBar);
