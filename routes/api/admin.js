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


// const uploadToS3 = async (itemName, item) => {
//   // console.log(videoName);
//   // console.log(typeof itemName);
//   const params = {
//     Bucket: 'nanibeatswebsite',
//     Key: `${itemName}`,
//     ACL: 'public-read',
//     Body: item,
//   };
//   s3.upload(params, function (err, data) {
//     console.log(err, data);
//   });
// }


async function uploadToS3(file) {
  return new Promise(async function (resolve, reject) {
    const params = {
      Bucket: 'nanibeatswebsite', // pass your bucket name
      Key: file.originalname,
      ACL: 'private',
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype
    };
    await s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        reject(s3Err);
      }
      console.log(`File uploaded successfully at ${data}`);
      resolve(data);
    });
  });
}

router.post('/upload', cUpload, (req, res) => {
  console.log(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  console.log(req.files)
  console.log(req.body)
  console.log(Object.keys(req.files).length)
  console.log('inside');
  const keys = Object.keys(req.files);

  for (let key of keys) {
    const currFile = req.files[key][0]
    uploadToS3(currFile).then((result) => {
      fs.unlink(currFile.path, (err) => {
        if (err) throw err;
        console.log(`${currFile.fieldname} deleted`);
      })
      console.log(result);
    }, (err) => {
      console.log(err)
    })
    // console.log(req.files[key][0])
  }
  res.send('it works');
})

module.exports = router;