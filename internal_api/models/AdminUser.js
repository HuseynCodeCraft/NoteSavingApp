const db = require('../db');
const uuid = require('uuid');

class User {
  static create(username, password, callback) {
    const id = uuid.v4();
    const query = 'INSERT INTO admin_users (id, username, password) VALUES (?, ?, ?)';
    db.query(query, [id, username, password], (error, results) => {
      if (error) throw error;
      callback(id); // Pass the ID of the newly created admin user to the callback
    });
  }
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM admin_users WHERE username = ?';
    db.query(query, [username], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  }
}

module.exports = User;

