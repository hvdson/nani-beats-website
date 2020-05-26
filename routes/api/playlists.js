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
    if (err) return console.error(err);
    return res.json(playlists);
  })
})

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // get mongoDB playlist json data
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) return console.error(err);
    console.log(playlist.songs)
    return res.json(playlist.songs);
  })
})

module.exports = router;