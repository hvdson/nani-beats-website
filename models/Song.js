// Create Schema
const mongoose = require('mongoose');

//Create Schema
const SongSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  songBucketKey: String,
  artistsType: Array,
  bpm: Number,
  key: String,
  tags: Array,
  imgThumbUrl: String,
  songUrl: String,
  playCount: Number,
  downloadCount: Number,
  likeCount: Number,
  songId: String,
});

const Song = mongoose.model('songs', SongSchema);
module.exports = Song;