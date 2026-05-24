const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bridal_app_images', // folder name in your Cloudinary account
    allowedFormats: ['jpeg', 'png', 'jpg', 'svg', 'webp'],
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`
  }
});

const uploadImage = multer({storage: storage});

module.exports = uploadImage;
