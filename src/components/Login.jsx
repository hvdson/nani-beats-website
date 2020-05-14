import React, { Component } from "react";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    const userData = {
          email: this.state.email,
          password: this.state.password
        };
    console.log(userData);
  };
    
  render() {
    const { errors } = this.state;

    return (
      <div className="container wrapper">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i class="fas fa-chevron-left"></i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>

            <div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-field col">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="col">
                  <button type="submit" className="btn btn-primary">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;