import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUserProfile,
  deleteUserProfile
} from "../../store/actions/profiles";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import ProfileDetails from "../Profile/ProfileDetails";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getUserProfile();
  }
  onDeleteClick(e) {
    this.props.deleteUserProfile();
  }

  render() {
    let dashboardContent = "";
    let { profile, isLoading } = this.props.profile;
    let { user } = this.props.auth;
    if (profile === null || isLoading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div className="profile-details">
          <p>Welcome {user.name}</p>
          <div>
            <ProfileDetails />
          </div>
          <Link to="/edit-profile">Edit Profile</Link>
          <div style={{ marginBottom: "60px" }} />
          <button onClick={this.onDeleteClick.bind(this)}>
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <h2> Welcome {user.name} </h2>
          <p>
            You haven't created any profile. Please create a profile by clicking
            here
          </p>
          <Link to="/createProfile"> Create a profile</Link>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};
const mapDispatchToProps = { getUserProfile, deleteUserProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
