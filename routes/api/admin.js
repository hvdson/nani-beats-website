const express = require('express');
const router = express.Router();
const fs = require('fs');

const multipartMiddleware = require('connect-multiparty')();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
const Song = require('../../models/Song');

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send();
  }
}
const cUpload = upload.fields([{
  name: 'imgFile',
  maxCount: 1
}, {
  name: 'audioFile',
  maxCount: 1
}])

router.post('/upload', passport.authenticate('jwt', {session: false}), isAdmin, cUpload, (req, res) => {
  console.log(req.files)
  console.log(req.body)
  console.log('inside');
  
  fs.unlink(req.files['imgFile'][0].path, (err) => {
    if (err) throw err;
    console.log('imgfile deleted');
  })

  fs.unlink(req.files['audioFile'][0].path, (err) => {
    if (err) throw err;
    console.log('audioFile deleted');
  })
  
  
  res.send('it works');
})

module.exports = router;