require('dotenv').config()
const express = require('express');
// routes
const users = require('./routes/api/users');
const playlists = require('./routes/api/playlists');
const songs = require('./routes/api/songs');
const admin = require('./routes/api/admin');
const stripe = require('./routes/api/stripe');

const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors')
const proxy = require('express-http-proxy');
const url = require('url');
const mongoose = require('mongoose');

// DEBUG: deprecated findOneAndUpdate work around
mongoose.set('useFindAndModify', false);

const passport = require('passport');
require('./config/passport')(passport);
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
app.use('/api/stripe', stripe);

app.listen(port, () => console.log(`Listening on port ${port}`));