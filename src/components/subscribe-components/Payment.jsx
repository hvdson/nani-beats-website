import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SubscribePlan extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Payment</h1>
          <div class="d-flex justify-content-center">
            <div class="card subscribe-info text-dark mb-3">
              <div class="card-header"></div>
              <div class="card-body">
                <h5 class="card-title">Payment</h5>
                <table class="table text-dark">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <i className="far fa-check fa-2x"/>
                      </th>
                      <td>Bruh unlimited beats</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button className="btn btn-lg btn-danger">
            money
          </button>
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