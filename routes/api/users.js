const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isValid = require('is-empty');
const keys = require('../../config/keys');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load User Model
const User = require('../../models/User');

// create register endpoint
router.post('/register', (req, res) => {
  // form validation
  if (!isValid()) {
    return res.status(400).json(validateRegisterInput.errors);
  }

  User.findOne({ 
    email : req.body.email 
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
          role: user.role
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
        return res.status(400).json({ passwordIncorrect: 'Password or email Incorrect'})
      }
    })
  });
});

module.exports = router;