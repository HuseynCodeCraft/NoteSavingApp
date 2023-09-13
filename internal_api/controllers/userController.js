const path = require('path');
const fs = require('fs');
const Note = require('../models/Notes');
const { validationResult } = require('express-validator');

exports.UploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { filename } = req.file;
  return res.status(200).json({ message: 'File uploaded successfully.', filename });
};

exports.GetPhoto = (req, res) => {
  const userId = req.user.userId;
  const ext = '.png';
  const imagePath = path.join(__dirname, '..', 'uploads', `${userId}${ext}`);

  if (fs.existsSync(imagePath)) {
    res.download(imagePath);
  } else {
    res.status(404).json({ error: 'Profile photo not found.' });
  }
};

exports.PostNotes = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const user_id = req.user.userId;
  const { title, content } = req.body;

  Note.create(user_id, title, content, (noteId) => {
    res.status(201).json({ message: 'Note created successfully!', noteId });
  });
};

exports.GetNotes = (req, res) => {
  const user_id = req.user.userId;
  const noteId = req.params.NoteId;
  Note.findByUserIdAndNoteId(user_id, noteId, (error, userNote) => {
    if (error) {
      console.error('Error fetching user note:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user note.' });
    }

    res.status(200).json({ note: userNote });
  });
};

exports.UpdateNotes = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const user_id = req.user.userId;
  const noteId = req.params.NoteId;
  const { content } = req.body;

  Note.checkNoteOwnership(user_id, noteId, (error, isOwner) => {
    if (error) {
      console.error('Error checking note ownership:', error);
      return res.status(500).json({ error: 'An error occurred while checking note ownership.' });
    }

    if (!isOwner) {
      return res.status(403).json({ error: 'You do not have permission to update this note.' });
    }

    Note.updateNote(noteId, content, (updateError) => {
      if (updateError) {
        console.error('Error updating note:', updateError);
        return res.status(500).json({ error: 'An error occurred while updating the note.' });
      }

      res.status(200).json({ message: 'Note updated successfully.' });
    });
  });
};

exports.DeleteNotes = (req, res) => {
  const user_id = req.user.userId;
  const noteId = req.params.NoteId;
  
  Note.checkNoteOwnership(user_id, noteId, (error, isOwner) => {
    if (error) {
      console.error('Error checking note ownership:', error);
      return res.status(500).json({ error: 'An error occurred while checking note ownership.' });
    }

    if (!isOwner) {
      return res.status(403).json({ error: 'You do not have permission to delete this note.' });
    }

    // Proceed with deleting the note
    Note.deleteNote(noteId, (deleteError) => {
      if (deleteError) {
        console.error('Error deleting note:', deleteError);
        return res.status(500).json({ error: 'An error occurred while deleting the note.' });
      }

      res.status(200).json({ message: 'Note deleted successfully.' });
    });
  });
};
