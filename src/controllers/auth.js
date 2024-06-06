const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const { hash } = require('../services/hash-pass')


exports.auth = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error al acceder a la base de datos",
                    messageDev: err.message,
                    code: "ERR_DB",
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: "Usuario o contraseña inválidos",
                    messageDev: "No se encontró el usuario en la base de datos",
                    code: "ERR_AUTH",
                });
            }

            const user = results[0];
            const passwordMatch = bcrypt.compareSync(pass, user.pass);

            if (!passwordMatch) {
                return res.status(400).json({
                    message: "Usuario o contraseña inválidos",
                    messageDev: "La contraseña no coincide",
                    code: "ERR_AUTH",
                });
            }

            return res.status(200).json({
                message: "Autenticación exitosa",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol,
                },
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error inesperado, intente más tarde",
            messageDev: error.message,
            code: "ERR_SERVER",
        });
    }
};
