import React, { Component } from "react";
import { loginUser } from "../../store/actions/register";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "../../utilities/is-empty";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }
  render() {
    const errors = this.state.errors;
    return (
      <section className="login-container">
        {!isEmpty(errors) && (
          <div className="error-div">Invalid credentials</div>
        )}
        <h1>Sign In</h1>
        <p>Sign into Your Account</p>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
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
              onChange={this.onChange}
              value={this.state.password}
            />
            {errors && errors.password && (
              <div className="error-div"> {errors.password} </div>
            )}
          </div>
          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
