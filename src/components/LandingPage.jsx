import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { logoutUser } from "../actions/authActions";
const isEmpty = require('is-empty');

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      submit: false
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateEmail(this.state.email)) {
      this.setState({submit: true});
    } else {
      alert('please enter a valid email address')
    }
   }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ email: e.target.value})
  }

  render() {
    if (this.state.submit) {
      return <Redirect
        to={{
          pathname: '/register',
          state: { email: this.state.email }
        }}
      />
    }
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>
                  Your next hit is waiting.
              </h1>

              <h3>
                UNLIMITED Beats for artists, all at your fingertips.
                <br/>
                Every month.
              </h3>

              <div className="d-flex justify-content-center" onSubmit={e => this.handleSubmit(e)}>
                <form className="input-group input-group-lg col-8">
                  <input id="email" value={this.state.email} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Email Address" onChange={e => this.handleChange(e)} required/>
                  <button className="btn btn-lg btn-danger" type="submit">
                    Start Your FREE MONTH
                  </button>
                </form>              
              </div>



              <p>
                Then monthly for less than the price of your phone bill.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function renderUser(user) {
  if (!isEmpty(user)) {
    return (<b> Hey there, {user.name.split(" ")[0]} </b>)
  } else {
    return (<div>No User</div>)
  }
}

LandingPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(LandingPage);