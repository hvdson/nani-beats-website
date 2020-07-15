require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

// load User Model
const User = require('../../models/User');

router.post('/save-subscription', (req, res) => {
  User.findOne({ 
    stripeId : req.body.stripeId
  }).then((user) => {
    if (!user) {
      return res.status('402').send({ error: { message: "No user exists" }});
    } else {
      user.isSubscribed = true;
      user.save((err) => {
        if (err) {
          console.error('ERROR!');
        }
      })
      res.send(user);
    }})
    .catch(err => console.error(err))
});

router.post('/create-subscription', async (req, res) => {
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message }})
  }

  let updateCustomerDefaultPaymentMethod = await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: process.env[req.body.priceId] }],
    expand: ['latest_invoice.payment_intent'],
  });
  res.send(subscription);
});

router.post('/retry-invoice', async (req, res) => {
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId
      }
    });
  } catch (error) {
    return res.status('402').send({ result: { error: { message: error.message } } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent']
  });
  res.send(invoice);
});

module.exports = router;