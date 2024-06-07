const db = require('../config/db.config');
const { hash } = require('../services/hash-pass')

exports.updatePassword = async (req, res) => {
   const { email, newPass } = req.body;

      if (!email || !newPass) {
        return res.status(400).json({ 
            message: 'El correo ha expirado.' ,
            code: "ERR_EMAIL_EXPIRED",
    });
    }
   try {
    const newHashedPassword = await hash(newPass);

    // Ejecutamos la consulta para actualizar la contraseña en la base de datos
    db.query('UPDATE users SET pass = ? WHERE email_recovery = ?', [newHashedPassword, email], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error al acceder a la base de datos",
                messageDev: err.message,
                code: "ERR_DB",
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el usuario con ese correo electrónico",
                code: "ERR_NOT_FOUND_EMAIL",
            });
        }
        return res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    });
} catch (error) {
    return res.status(500).json({
        message: "Error inesperado, intente más tarde",
        messageDev: error.message,
        code: "ERR_SERVER",
    });
}
}