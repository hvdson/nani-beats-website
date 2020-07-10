require('dotenv').config()
const express = require('express');
const router = express.Router();
const fs = require('fs');

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
const Playlist = require('../../models/Playlist');

const auth = passport.authenticate('jwt', { session: false });

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

function selectFolderUploadToS3(fileKey) {
  return (fileKey === 'imgFile' ? 'images' : 'songs');
}

async function uploadToS3(file, fileKey) {
  return new Promise(async function (resolve, reject) {
    const params = {
      Bucket: 'nanibeatswebsite', // pass your bucket name
      Key: selectFolderUploadToS3(fileKey) + '/' + file.originalname,
      ACL: 'private',
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype
    };
    await s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        reject(s3Err);
      }
      console.log(`File uploaded successfully at ${data.Location}`);
      resolve(data);
    });
  });
}

async function uploadFilesS3ThenUnlink(req) {
  return new Promise(async (resolve, reject) => {
    const errors = [];
    const data = {};
    const keys = Object.keys(req.files);
    for (let key of keys) {
      const currFile = req.files[key][0]
      await uploadToS3(currFile, key).then((result) => {
        fs.unlink(currFile.path, (err) => {
          if (err) {
            console.error(err);
            errors.push(err);
          } 
          console.log(`${currFile.fieldname} temp file deleted`);
        })
        data[key] = result
      }, (err) => {
        errors.push(err);
        console.error(err)
      })
    }
    if (errors.length > 0) {
      reject(errors)
    } else {
      resolve(data);
    }
  })
}

async function uploadToMongoDB(req, result) {
  console.log(result)
  const songUpload = new Song({
    s3Key: result.audioFile.Key,
    title: req.body.title,
    artistsType: req.body.artistsType.split(','),
    bpm: req.body.bpm,
    key: req.body.key,
    length: req.body.length,
    tags: req.body.tags.split(','),
    dateAdded: Date.now(),
    imgThumbUrl: "",
    signedUrl: "",
  })
  songUpload.save((err, song) => {
    if (err) throw err;
    else { 
      console.log('Song successfully uploaded!')
      uploadToPlaylist_temporary(song)
      return true;
    }
    // should add to playlist here
  })
}

// TODO: later will have create playlist feature - this is just for now
function uploadToPlaylist_temporary(song) {
  console.log('song:', song)
  const filter = { name: 'New Nani Heat'}
  const update = { $push: { songs: song.id}}
  Playlist.findOneAndUpdate(filter, update, (err, success) => {
    if (err) {
      console.error(err);
    } else {
      console.log(success);
    }
  })
}

router.post('/upload', cUpload, (req, res) => {
  uploadFilesS3ThenUnlink(req)
  .then((result) => uploadToMongoDB(req,result))
  .then((result) => {
    console.log(result);
    res.send('it works');
  })
  .catch((err) => console.log(err))
})

  // todo: refactor
  // const keys = Object.keys(req.files);
  // for (let key of keys) {
  //   const currFile = req.files[key][0]
  //   uploadToS3(currFile, key).then((result) => {
  //     fs.unlink(currFile.path, (err) => {
  //       if (err) throw err;
  //       console.log(`${currFile.fieldname} temp file deleted`);
  //     })
  //     console.log(result);
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }


module.exports = router;