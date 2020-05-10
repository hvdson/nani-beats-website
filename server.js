const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors')
const proxy = require('express-http-proxy');
const url = require('url');
const aws = require('aws-sdk');
require('dotenv').config()

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
console.log(typeof AWS_ACCESS_KEY_ID)

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
})
const s3 = new aws.S3();

const app = express();
const port = process.env.PORT || 8080;

const songUrl = 'http://s000.tinyupload.com/?file_id=47163309312844766501';
const cloutKirby = "https://i.redd.it/fx8fagknp1k21.jpg"

const monahSongObj = {
  id: "hashnum69",
  src: "",
  imgThumbSrc: cloutKirby,
  artistsType: ["Lance The Wrapper", "Drake", "Post Malone"],
  title: "Monahh",
  bpm: 69,
  key: "A#",
  length: "2:50",
  dateAdded: Date.now(),
  tags: ["dank beat", "neat", "heat", "🔥"]
}

const playlistObj = {      
  id: "hashedplaylistid69",
  name: "Nani Picks",
  songs: [monahSongObj]
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', express.static('public'));

// Enable CORS
app.use(cors({
  exposedHeaders: ['Content-Length','Content-Type']
}));

app.get('/api/hello', (req, res) => {
  res.send({
    data: 'Hello From Express'
  });
});

// todo: this will be the base functionality of getting playlist
// return the object as a response to client side for wavesurfer to use
// something to do with proxy
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

  // res.send({
  //   data: 'Hello From Express'
  // });

});

app.get('/api/monah', (req, res) => {
  const songKey = 'NANI BEATS VOL. 4/monahhh.mp3'
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

  async function process(song) {
    // for (const video of videos) {
    const signedUrl = await getSignedUrl();
    monahSongObj.src = signedUrl;
    return song;
  }

  process(monahSongObj).then((processed) => {
    console.log(processed);
    res.json(processed);
    res.end();
  });
})

app.post('/api/world', (req, res) => {
  console.log(req.body );
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Proxy to media server
app.use('/media', proxy(songUrl, {
  proxyReqPathResolver: function (req, res) {
    return res;
  }
}));

app.listen(port, () => console.log(`Listening on port ${port}`));