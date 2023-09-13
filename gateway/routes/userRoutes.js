const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.post('/upload-profile-photo', userController.UploadPhoto);

router.get('/get-profile-photo', userController.GetPhoto);

router.get('/get-user-note/:NoteId', userController.GetNotes);

router.post('/post-user-note', userController.PostNotes);

router.put('/update-user-note/:NoteId', userController.UpdateNotes);

router.delete('/delete-user-note/:NoteId', userController.DeleteNotes);

module.exports = router;

