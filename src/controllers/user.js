const db = require('../config/db.config');
const { hash } = require('../services/hash-pass')

exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(400).json({
            message: "Error al obtener la petición de usuarios",
            messageDev: "No se encontró el usuario en la base de datos",
            code: "ERR_GET_USERS",
        })
      }
      res.status(200).json(results);
    });
  };
  
  exports.createUser = async (req, res) => {
    let { name, email, pass } = req.body;
    pass = await hash(pass);
    db.query('INSERT INTO users (name, email, pass) VALUES (?,?,?)', [name, email, pass], (err, results) => {
      if (err) {
        return res.status(400).json({
            message: "Error al generar un nuevo usuario",
            messageDev: "No es posible insertar al usuario a la base de datos",
            code: "ERR_CREATE_USER",
        })
      }
      res.status(201).send('User created successfully');
    });
  };