const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);
// const keys = require('../../config/keys');
// const db = require('../../config/keys').mongoURI;

// load User Model
const Playlist = require('../../models/Playlist');
const Song = require('../../models/Song');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  // get mongoDB playlist json data
  Playlist.find((err, playlists) => {
    if (err) return console.error(err);
    return res.json(playlists);
  })
})

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // get mongoDB playlist json data
  Playlist.findById(req.params.id)
    .populate('songs')
    .exec((err, playlist) => {
      return res.json(playlist);
  })
})

module.exports = router;