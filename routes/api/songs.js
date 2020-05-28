const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);

// load User Model
const Playlist = require('../../models/Playlist');
const Song = require('../../models/Song');

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

router.get('/:folder/:file', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('inside');
  const songKey = req.params.folder + '/' + req.params.file
  const params = {
    Bucket: 'nanibeatswebsite',
    Key: songKey
  };

  async function getSignedUrl() {
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  async function process() {
    const signedUrl = await getSignedUrl();
    return signedUrl;
  }

  process().then((processed) => {
    console.log(processed);
    res.json(processed);
    res.end();
  });
});

module.exports = router;