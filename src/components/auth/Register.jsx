import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import classnames from 'classnames'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: this.props.location.state ? this.props.location.state.email : '',
      password: '',
      passwordConfirm: '',
      errors: {},
    }
  };

  //TODO: FIX this
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/web-player");
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.errors) {
  //     this.setState({
  //       errors: prevProps.errors
  //     })
  //   }
  // }

  //TODO: change to componentDidUpdate()
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };
    this.props.registerUser(newUser, this.props.history);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { errors } = this.state;
  
    return (
      <div className="wrapper">
        <div className="container">
          <div className="col">
            <Link to="/" className="btn-flat waves-effect">
              <i className="fas fa-chevron-left"></i> Back to
              home
            </Link>
            <div className="col s12">
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
          <form noValidate className="col" onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("form-control", "col-sm-9", {
                  invalid: errors.email
                })}
              />
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="form-group row">
              <label class="col-sm-3 col-form-label">Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("form-control", "col-sm-9", {
                  invalid: errors.name
                })}
              />
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="form-group row">
              <label class="col-sm-3 col-form-label">Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("form-control", "col-sm-9",{
                  invalid: errors.password
                })}
              />
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="form-group row">
              <label class="col-sm-3 col-form-label">Confirm Password</label>
              <input
                onChange={this.onChange}
                value={this.state.passwordConfirm}
                error={errors.passwordConfirm}
                id="passwordConfirm"
                type="password"
                className={classnames("form-control", "col-sm-9", {
                  invalid: errors.passwordConfirm
                })}
              />
              <span className="red-text">{errors.passwordConfirm}</span>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-lg btn-primary">
                Sign up
              </button>
            </div>
          </form>
          
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));