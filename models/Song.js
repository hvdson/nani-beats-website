// Create Schema
const mongoose = require('mongoose');

//Create Schema
const SongSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  s3Key: String,
  artistsType: Array,
  bpm: Number,
  key: String,
  tags: Array,
  length: String,
  dateAdded: String,
  imgThumbUrl: String,
  songUrl: String,
  playCount: Number,
  downloadCount: Number,
  likeCount: Number,
  songId: String,
  signedUrl: String,
});

const Song = mongoose.model('songs', SongSchema);
module.exports = Song;