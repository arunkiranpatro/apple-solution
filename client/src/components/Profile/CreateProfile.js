import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserProfile } from "../../store/actions/profiles";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      gender: "",
      age: "",
      interests: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.createProfile = this.createProfile.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createProfile(e) {
    e.preventDefault();
    let data = {
      handle: this.state.handle,
      gender: this.state.gender,
      age: this.state.age,
      interests: this.state.interests
    };
    this.props.createUserProfile(data, this.props.history);
  }
  render() {
    const errors = this.props.errors;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div>
              <h1>Create Your Profile</h1>
              <form onSubmit={this.createProfile}>
                <div>
                  <input
                    placeholder="Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                  />
                </div>
                <div>
                  <input
                    placeholder="Gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    placeholder="Age"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    placeholder="Interests"
                    name="interests"
                    value={this.state.interests}
                    onChange={this.onChange}
                  />
                  <small>
                    ("Please use comma separated values (eg. cricket,tennis")
                  </small>
                </div>
                <div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};
const mapDispatchToProps = {
  createUserProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
