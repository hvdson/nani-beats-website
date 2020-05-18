// Create Schema
const mongoose = require('mongoose');

//Create Schema
const SongSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  songs: Array,
});

const Song = mongoose.model('songs', SongSchema);
module.exports = Song;