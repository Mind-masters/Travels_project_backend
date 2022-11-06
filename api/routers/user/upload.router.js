const express = require('express')
// const upload = require('../../../plugins/cloudinary.config')
const uploadController = require('../../controllers/user/upload.controler')
const UploadRouter = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
UploadRouter.post(
  '/upload-file',
  upload.single('file'),
  uploadController.uploadFile
)

module.exports = UploadRouter
