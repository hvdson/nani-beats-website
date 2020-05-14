import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {},
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };

    console.log(newUser);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

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
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>

            <div className="form-group">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                  />
                  <label htmlFor="name">Name</label>
                </div>
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
                <div className="input-field col">
                  <input
                    onChange={this.onChange}
                    value={this.state.passwordConfirm}
                    error={errors.passwordConfirm}
                    id="passwordConfirm"
                    type="password"
                  />
                  <label htmlFor="passwordConfirm">Confirm Password</label>
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
    )
  }
}

export default Register;