require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load User Model
const User = require('../../models/User');

async function createStripeCustomer(req) {
  const customer = await stripe.customers.create({
    email: req.body.email
  })
  return customer;
}

// create register endpoint
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // form validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ 
    email : req.body.email 
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      createStripeCustomer(req).then((customer) => {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          isSubscribed: false,
          stripeId: customer.id
        });
        
        // Hash password before database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          });
        });
      })
      .catch(err => console.error(err))
    }
  });
});

router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // check if exists
    if (!user) {
      return res.status(404).json({ emailNotFound: 'Password or email Incorrect'})
    }
    
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) { 
        // User match -> create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role,
          isSubscribed: user.isSubscribed,
          stripeId: user.stripeId
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({ passwordIncorrect: 'Email or Password Incorrect'})
      }
    })
  });
});

module.exports = router;