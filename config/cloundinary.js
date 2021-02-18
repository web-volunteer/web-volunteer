const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:'dqo9fvdo5',
  // cloud_name:process.env.CLOUDINARY_NAME,
  api_key:'926476757988366',
  // api_key: process.env.CLOUDINARY_KEY,
  api_secret:'y0_DmZPCMVLBNzXALoC4gxPymA8'
  // api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'web-volunteer',
    allowed_formats: 'jpg, png'
  }
});

const uploader = multer({ storage });

module.exports = {
  uploader: uploader,
  cloudinary: cloudinary
};