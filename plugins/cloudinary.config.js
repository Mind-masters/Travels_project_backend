var cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uploadFile = async (url) => {
  return await cloudinary.uploader.upload(url, {
    folder: 'user',
    use_filename: true,
  })
}

module.exports = {
  uploadFile,
}
