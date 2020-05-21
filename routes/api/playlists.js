const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);
// const keys = require('../../config/keys');
// const db = require('../../config/keys').mongoURI;

// load User Model
const Playlist = require('../../models/Playlist');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

  // get mongoDB playlist json data
  Playlist.find(function (err, playlists) {
    console.log('inside')
    if (err) return console.error(err);
    return res.json(playlists);
  })
  // return data object
})

module.exports = router;