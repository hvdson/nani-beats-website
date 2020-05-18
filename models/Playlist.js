// Create Schema
const mongoose = require('mongoose');

//Create Schema
const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  songs: Array,
});

const Playlist = mongoose.model('playlists', PlaylistSchema);
module.exports = Playlist;