import React, { Component } from "react";
import { registerUser } from "../../store/actions/register";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  submit(e) {
    e.preventDefault();
    let newUser = {
      name: this.refs._name.value,
      email: this.refs._email.value,
      password: this.refs._pwd.value,
      password2: this.refs._pwd2.value
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const errors = this.state.errors;
    return (
      <section className="register-container">
        <h1>Sign Up</h1>
        <p>Create Your Account</p>
        <form className="form" onSubmit={this.submit}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" ref="_name" />
            {errors && errors.name && (
              <div className="error-div"> {errors.name} </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              ref="_email"
            />
            {errors && errors.email && (
              <div className="error-div"> {errors.email} </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref="_pwd"
            />
            {errors && errors.password && (
              <div className="error-div"> {errors.password} </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              ref="_pwd2"
            />
            {errors && errors.password2 && (
              <div className="error-div"> {errors.password2} </div>
            )}
          </div>
          <input type="submit" value="Register" />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
