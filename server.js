const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8080;

const url = 'https://nanibeats.com/wp-content/uploads/2020/04/monahhh.mp3';
const cloutKirby = "https://i.redd.it/fx8fagknp1k21.jpg"

const monahSongObj = {
  id: "hashnum69",
  src: url,
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

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express'
  });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/api/monah', (req, res) => {
  request({
      url: url
    },
    (err, res, body) => {
      if (err || res.statusCode !== 200) {
        return res.status(500).json({
          type: 'error',
          message: err.message
        });
      }
      res.download(url);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));