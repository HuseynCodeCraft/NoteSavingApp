const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const allowedFileTypes = ['.png' ];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = req.user.userId + extname;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error('Only image files with .png extensions are allowed.'));
  }
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: fileFilter
});

router.post('/upload-profile-photo', authMiddleware.isAuthenticated, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    userController.UploadPhoto(req, res, next);
  });
});

router.get('/get-profile-photo', authMiddleware.isAuthenticated, userController.GetPhoto);

router.post('/post-user-note', authMiddleware.isAuthenticated, [
  body('content').isString().notEmpty().withMessage('Note content is required and must be a string'),
  body('title').isString().notEmpty().withMessage('Title content is required and must be a string')
  ], userController.PostNotes);

router.get('/get-user-note/:NoteId', authMiddleware.isAuthenticated, userController.GetNotes);

router.put('/update-user-note/:NoteId', authMiddleware.isAuthenticated, [
  body('content').isString().notEmpty().withMessage('Note content is required and must be a string')
], userController.UpdateNotes);

router.delete('/delete-user-note/:NoteId', authMiddleware.isAuthenticated, [
  // Add validation rules if needed for any parameters or query strings
], userController.DeleteNotes);


router.use(errorHandler);

module.exports = router;

