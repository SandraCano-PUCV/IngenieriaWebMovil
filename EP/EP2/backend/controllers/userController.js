const UserModel = require('../models/userModel');

const UserController = {
  index: (req, res) => {
    UserModel.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  },
  store: (req, res) => {

    const { username, rut, email, region, comuna, password } = req.body;
    //validar que el usuario  no se encuentre
    // Verificar si el username ya existe

   UserModel.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      return res.status(409).json({ error: 'El nombre de usuario ya está registrado' });
    }

    // Declaramos el objeto con los campos esperados por MySQL
    const newUser = { username, rut, email, region, comuna, password };
    UserModel.create(newUser, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({message:"Usuario registrado", userId: result.insertId, ...newUser });
    });
  });
  },
// Iniciar sesión
login: (req, res) => {
  const {username,password} = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  UserModel.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    console.log(user);
    
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({ message: 'Inicio de sesión exitoso', user });
  });
}

};



module.exports = UserController;
