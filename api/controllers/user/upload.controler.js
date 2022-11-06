const fs = require('fs')
const { uploadFile } = require('../../../plugins/cloudinary.config')
class uploadController {
  static async uploadFile(req, res, next) {
    if (!req.file)
      return res.status(400).json({
        message: 'No file uploaded',
      })
    await uploadFile(req.file.path)
      .then((result) => {
        const data = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        }
       return res.status(200).send({
          data,
        })
      })
      .catch((err) => {
        return res.status(400).send({
          message: 'cannot-upload-file',
        })
      })
  }

  static async changeFile(req, res, next) {}
}

module.exports = uploadController
