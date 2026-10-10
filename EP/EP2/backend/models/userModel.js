const db = require('../config/db');

const UserModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuarios', callback);
  },
  create: (user, callback) => {
    db.query('INSERT INTO usuarios SET ?', user, callback);
  },
  // Buscar usuario por nombre de usuario o correo (login)
  findByUsername: (username, callback) => {
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], callback);
  }
};


module.exports = UserModel;