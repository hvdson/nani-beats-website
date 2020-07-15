import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Redirect } from 'react-router-dom';

require('dotenv').config({
  path: '../.env'
});

const subscriptionInfo = {
  name: 'UNLIMITED',
  price: '$49.99',
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
  console.error('**Stripe publishable key environment variable not set**');
  console.error(
    '**Add an environemnt variable REACT_APP_STRIPE_PUBLISHABLE_KEY**'
  );
  console.error('**Replace .env.example with .env and **');
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      subscribing: false,
      errorToDisplay: ''
    }
    // this.stripe = useStripe();
    // this.elements = useElements();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('clicked', e.target.value)
  }

  // render() {
  //   const { user } = this.props.auth;
  //   return (
  //     <div className="wrapper">
  //       <div className="container">
  //         <h1>Payment</h1>
  //         <label>
  //           Card details
  //         </label>
  //         <CardElement options={CARD_ELEMENT_OPTIONS}/>
  //         <button className="btn btn-lg btn-danger" onClick={this.handleClick}>
  //           Pay
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div id="payment-form" className="flex justify-center">
        <div className="w-full inline-block border p-4 rounded-md">
          <div className="font-bold text-xl mb-2">
            Enter your card details. <br />
            Your subscription will start now.
          </div>
          <p className="text-gray-700 text-base">
            → Total due now <span>{subscriptionInfo.price}</span>
          </p>
          <p className="text-gray-700 text-base mb-4">
            → Subscribing to{' '}
            <span className="font-bold">{subscriptionInfo.name}</span>
          </p>

          <div className="w-full">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Full name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 border rounded-md py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="First and last name"
                  required
                />
              </div>
            </div>
            <form id="payment-form" onSubmit={e => this.handleSubmit(e)}>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3 mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Card
                  </label>
                  <div
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-md py-3 px-2 leading-tight focus:outline-none focus:bg-white"
                    id="card-element"
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#32325d',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                            '::placeholder': {
                              color: '#a0aec0',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="text-gray-700 text-base mt-2" role="alert">
                    {this.state.errorToDisplay ? this.state.errorToDisplay : null}
                  </div>
                </div>
              </div>
              <button
                id="submit-info"
                className="w-full bg-pasha hover:bg-white hover:shadow-outline hover:text-pasha hover:border hover:border-black focus:shadow-outline text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded-md"
                type="submit"
              >
                <div className="">
                  <div>{this.state.subscribing ? 'Subscribing...' : 'Subscribe'}</div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Payment.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null,
)(Payment);