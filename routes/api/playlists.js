const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);
const jwt = require('jsonwebtoken');
const isValid = require('is-empty');

const keys = require('../../config/keys');
// load User Model
const Playlist = require('../../models/Playlist');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json({message: "it works!"});
})

module.exports = router;