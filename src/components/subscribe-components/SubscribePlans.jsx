import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SubscribePlan extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Subscribe</h1>
          <div class="d-flex justify-content-center">
            <div class="card subscribe-info text-dark mb-3">
              <div class="card-header">Subscription Plan</div>
              <div class="card-body">
                <h5 class="card-title">Unlimited</h5>
                <table class="table text-dark">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x"/>
                      </th>
                      <td>Bruh unlimited beats</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x" />
                      </th>
                      <td>What else u want lmao</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x" />
                      </th>
                      <td>Deez Nutz</td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x" />
                      </th>
                      <td>Free for 30 days</td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x" />
                      </th>
                      <td>$49.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Link className="btn btn-lg btn-danger" to="subscribe/payment">
            money pls
          </Link>
        </div>
      </div>
    );
  }
}

SubscribePlan.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null,
)(SubscribePlan);