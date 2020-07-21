import React, { useState } from "react";
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
import { updateUserSubscription } from '../../actions/authActions';
import axios from 'axios';

/* 
TODO: 
- Finish building billing form - change relative to country 
  for reference: https://stripe-payments-demo.appspot.com/

- handle payment with action - throws error when using card number 4000002760003184
 https://stripe.com/en-ca/guides/strong-customer-authentication
*/

require('dotenv').config({
  path: '../.env'
});

const productInfo = {
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

// this is equal to CheckoutForm in example
const Payment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [subscribing, setSubscribing] = useState(false); 
  let [errorToDisplay, setErrorToDisplay] = useState('');

  function retryInvoiceWithNewPaymentMethod({ paymentMethodId, invoiceId }) {
    const priceId = productInfo.name.toUpperCase();
    return (
      axios.post('/api/stripe/retry-invoice', {
        customerId: props.auth.user.stripeId,
        paymentMethodId: paymentMethodId,
        invoiceId: invoiceId
      }).then((result) => {
        if (result.error) {
          throw result;
        }
        return result
      }).then((result) => {
        return {
          invoice: result.data,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          isRetry: true
        }
      }).then(handlePaymentThatRequiresCustomerAction)
      .then(onSubscriptionComplete)
      .catch((error) => {
        console.log(error);
        setSubscribing(false);
        setErrorToDisplay(error && error.error && error.error.decline_code);
      })
    )
  }

  function handlePaymentThatRequiresCustomerAction({
    subscription,
    invoice,
    priceId,
    paymentMethodId,
    isRetry
  }) {
    if (subscription && subscription.status === 'active') {
      return { subscription, priceId, paymentMethodId }
    }

    console.log('invoice', invoice)
    console.log('subscription', subscription)
    
    let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;
    console.log(paymentIntent)
    if (
      paymentIntent.status === 'requires_action' || 
      (isRetry === true && paymentIntent.status === 'requires_payment_method')
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            throw result;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    } else {
      // no customer action needed
      return { subscription, priceId, paymentMethodId}
    }
  }
    

  // TODO:
  function createSubscription({ paymentMethodId }, customer) {
    // TODO: server will convert this to proper priceId -> update .env
    const priceId = productInfo.name.toUpperCase();
    return (
      axios.post('/api/stripe/create-subscription', {
        customerId: customer.stripeId,
        paymentMethodId: paymentMethodId,
        priceId: priceId,
      })
    ).then((result) => {
      if (result.error) {
        throw result;
      }
      return result;
    }).then((result) => {
      return {
        subscription: result.data,
        paymentMethodId: paymentMethodId,
        priceId: productInfo.name
      }
    })
      .then(handlePaymentThatRequiresCustomerAction)
      .then(handleRequiresPaymentMethod)
      .then(onSubscriptionComplete)
      .catch((error) => {
        setSubscribing(false);
        setErrorToDisplay(error.message || error.error.decline_code)
      })
  }

  function handleRequiresPaymentMethod({
    subscription,
    paymentMethodId,
    priceId
  }) {
    if (subscription.status === 'active') {
      return { subscription, priceId, paymentMethodId };
    } else if ( 
      subscription.latest_invoice.payment_intent.status === 'requires_payment_method'
    ) {
      localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id );
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status
      );
      throw new Error('Your card was declined');
    } else {
      return { subscription, priceId, paymentMethodId };
    }
  }

  function onSubscriptionComplete(result) {
    console.log(result);
    if (result && !result.subscription) {
      const subscription = { id: result.invoice.subscription };
      result.subscription = subscription;
      localStorage.removeItem('latestInvoicePaymentIntentStatus')
      localStorage.removeItem('latestInvoiceId')
    }
    
    console.log('it works!')
    setSubscribing(false);
    props.updateUserSubscription(props.auth.user.stripeId)
    // setAccountInformation(result)
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // If a previous payment was attempted, get the lastest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus'
    );

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      console.log('[createPayment error]', error);
      setSubscribing(false);
      setErrorToDisplay(error && error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const paymentMethodId = paymentMethod.id;
      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') { 
        const invoiceId = localStorage.getItem('latestInvoiceId');
        retryInvoiceWithNewPaymentMethod({
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId
        })
      } else {
        createSubscription({
          paymentMethodId: paymentMethodId,
        }, props.auth.user);
      }
    }
  }

  // render
    if (props.auth.user.isSubscribed) {
      return (
        <Redirect
          to={{
            pathname: '/web-player',
          }}
        />
      );
    } else {
      return (
        <div className="wrapper">
          <div className="container">
            <div id="payment-form" className="flex justify-center">
              <div className="w-full inline-block border p-4 rounded-md">
                <div className="font-bold text-xl mb-2">
                  Enter your card details. <br />
                Your subscription will start now.
              </div>
                <p className="text-gray-700 text-base">
                  → Total due now <span>{productInfo.price}</span>
                </p>
                <p className="text-gray-700 text-base mb-4">
                  → Subscribing to{' '}
                  <span className="font-bold">{productInfo.name}</span>
                </p>

                <div className="w-full">
                  <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="input-group col-8">
                      <label className="col-sm-3 col-form-label">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="First Name"
                        // required
                      />

                      <label className="col-sm-3 col-form-label">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Last Name"
                        // required
                      />
                    </div>

                    <div className="input-group col-8">
                      <label className="col-sm-3 col-form-label">
                        Address
                      </label>
                      <input
                        className="form-control"
                        id="address"
                        type="text"
                        // required
                      />
                    </div>

                    <div className="input-group col-8">
                      <label className="col-sm-3 col-form-label">
                        City
                      </label>
                      <input
                        className="form-control"
                        id="city"
                        type="text"
                        // required
                      />
                    </div>
                    
                    <div className="input-group col-8">
                      <label className="col-sm-3 col-form-label">
                        State
                      </label>
                      <input
                        className="form-control"
                        id="State"
                        type="text"
                        // required
                      />

                      <label className="col-sm-3 col-form-label">
                        Zip Code
                      </label>
                      <input
                        className="form-control"
                        id="Zip"
                        type="text"
                        // required
                      />
                    </div>

                    <div className="input-group col-8">
                      <label className="col-sm-3 col-form-label">
                        Country
                      </label>
                      <input
                        className="form-control"
                        id="Country"
                        type="text"
                        // required
                      />
                    </div>

                    



                  </div>
                  <form id="payment-form" onSubmit={e => handleSubmit(e)}>
                    <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full px-3 mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Card
                      </label>
                        <div
                          className=""
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
                          {errorToDisplay ? errorToDisplay : null}
                        </div>
                      </div>
                    </div>
                    <button
                      id="submit-info"
                      className=""
                      type="submit"
                    >
                      <div className="">
                        <div>{subscribing ? 'Subscribing...' : 'Subscribe'}</div>
                      </div>
                    </button>
                  </form>
                </div>
              </div>
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
  { updateUserSubscription },
)(Payment);