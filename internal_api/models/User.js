const db = require('../db');
const uuid = require('uuid');

class User {
  static findByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  }
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  }
  static create(user, callback) {
    const id = uuid.v4();
    const { username, password, age, email } = user;
    const query = 'INSERT INTO users (id, username, password, age, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, username, password, age, email], (error, results) => {
      if (error) throw error;
      callback(id); // Pass the ID of the newly created user to the callback
    });
  }
}

module.exports = User;

