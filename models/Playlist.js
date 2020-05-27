// Create Schema
const mongoose = require('mongoose');

//Create Schema
const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imgThumbUrl: String,
  description: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'songs'
    }
  ]
});

const Playlist = mongoose.model('playlists', PlaylistSchema);
module.exports = Playlist;