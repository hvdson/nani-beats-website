require('dotenv').config()
const express = require('express');
// routes
const users = require('./routes/api/users');
const playlists = require('./routes/api/playlists');
const songs = require('./routes/api/songs');
const admin = require('./routes/api/admin');

const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors')
const proxy = require('express-http-proxy');
const url = require('url');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);

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
const db = require ('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());
// https: //stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// When extended property is set to:
// true: the URL-encoded data will be parsed with the qs library.
// false: querystring library
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use('/', express.static('public'));

app.use('/api/users', users);
app.use('/api/playlists', playlists);
app.use('/api/songs', songs);
app.use('/api/admin', admin);

app.get('/api/hello', (req, res) => {
  res.send({
    data: 'Hello From Express'
  });
});


// todo: modularize each endpoint & place in api for export - import into server.js
app.get('/api/s3', (req, res) => {
  (async () => {
    try {
        const response = await s3.listObjectsV2({
          Bucket: 'nanibeatswebsite',
          Prefix: 'NANI BEATS VOL. 4'
        }).promise();
        
        console.log(response);
        res.send({
          data: response
        });

      } catch (e) {
        console.log('error', e);
      }
      debugger;
  })();
});

app.listen(port, () => console.log(`Listening on port ${port}`));