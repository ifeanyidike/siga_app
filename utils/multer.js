import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/upload')
  },

  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    callback(null, true)
  } else
    ({
      error: 'Unsupported file format. Upload only JPEG/JPG/PNG',
    })
  false
}

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
})

export default upload
