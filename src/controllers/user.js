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
  let { name, paternal, maternal, email, cp, birthdate, pass, emailRecovery } = req.body;
  try {
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error al verificar el correo electrónico",
          messageDev: "No es posible verificar el correo electrónico en la base de datos",
          code: "ERR_CHECK_EMAIL",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "El correo electrónico ya está registrado",
          code: "ERR_EMAIL_DUPLICATE",
        });
      }

      pass = await hash(pass);
      db.query('INSERT INTO users (name, paternal,maternal,email,cp,birthdate, pass, email_recovery) VALUES (?,?,?,?,?,?,?,?)', [name, paternal, maternal,email,cp,birthdate, pass, emailRecovery], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: "Error al generar un nuevo usuario",
            messageDev: "No es posible insertar al usuario a la base de datos",
            code: "ERR_CREATE_USER",
          });
        }
        res.status(201).send('User created successfully');
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      code: "ERR_SERVER",
    });
  }
};