const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);
// const keys = require('../../config/keys');
// const db = require('../../config/keys').mongoURI;

// TODO: move this to file or config since it's being duplicated in songs.js & admin.js as well
const aws = require('aws-sdk');
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
})
const s3 = new aws.S3();

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
  // const params = {
  //   Bucket: 'nanibeatswebsite',
  //   Key: songKey
  // };

  async function getSignedUrl(params) {
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  // TODO: keep losing data when passed back - might be an async thing or pass by ref
  async function process(playlist) {
    const signedUrlSongs = [];
    for (const song of playlist.songs) {
      const params = {
        Bucket: 'nanibeatswebsite',
        Key: song.s3Key
      }
      const signedUrl = await getSignedUrl(params);
      console.log(song)
      song.signedUrl = signedUrl;

      // signedUrlSongs.push(song)
    }
    console.log(signedUrlSongs);
    return playlist;
  }

  // get mongoDB playlist json data
  Playlist.findById(req.params.id)
    .populate('songs')
    .exec((err, playlist) => {
      process(playlist).then((processed) => {
        console.log(playlist)
        res.json(processed);
        res.end();
      });
  })
})

module.exports = router;