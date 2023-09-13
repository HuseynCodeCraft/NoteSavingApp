const db = require('../db');
const uuid = require('uuid');

class Note {
  static create(user_id, title, content, callback) {
    const id = uuid.v4();
    const query = 'INSERT INTO user_notes (id, user_id, title, content) VALUES (?, ?, ?, ?)';
    db.query(query, [id, user_id, title, content], (error, results) => {
      if (error) throw error;
      callback(id); // Pass the ID of the newly created note to the callback
    });
  }
  
  static findByUserIdAndNoteId(user_id, noteId, callback) {
    const query = 'SELECT * FROM user_notes WHERE user_id = ? AND id = ?';
    db.query(query, [user_id, noteId], (error, results) => {
      if (error) return callback(error);

      if (results.length === 0) {
        return callback(null, null); // No note found
      }

      callback(null, results[0]);
    });
  }
  
  static updateNote(noteId, content, callback) {
    const query = 'UPDATE user_notes SET content = ? WHERE id = ?';
    db.query(query, [content, noteId], (error) => {
      if (error) return callback(error);

      callback(null);
    });
  }
  
  static deleteNote(noteId, callback) {
    const query = 'DELETE FROM user_notes WHERE id = ?';
    db.query(query, [noteId], (error, results) => {
      if (error) return callback(error);

      callback(null);
    });
  }
  
  static checkNoteOwnership(user_id, noteId, callback) {
    const query = 'SELECT COUNT(*) AS count FROM user_notes WHERE id = ? AND user_id = ?';
    db.query(query, [noteId, user_id], (error, results) => {
      if (error) return callback(error);

      const isOwner = results[0].count > 0;
      callback(null, isOwner);
    });
  }
}

module.exports = Note;

