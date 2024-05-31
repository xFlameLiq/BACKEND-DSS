const transporter = require('../services/mailer');
const db = require('../config/db.config');

exports.sendEmail = (req, res) => {
    const { emailRecovery } = req.body;

    try {
        db.query('SELECT * FROM users WHERE email_recovery = ? ', [emailRecovery], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error al acceder a la base de datos",
                    messageDev: err.message,
                    code: "ERR_DB",
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    message: "Correo enviado a la dirección",
                    messageDev: "No se encontró el usuario en la base de datos",
                    code: "ERR_NOT_FOUND_EMAIL",
                });
            } else {
                // Envía el correo
                const url = `http://localhost:5173/update-password?email=${encodeURIComponent(emailRecovery)}`;
                const mailOptions = {
                    from: 'sonicelherizo2002@gmail.com',
                    to: emailRecovery,
                    subject: 'Recuperación de Contraseña',
                    html: `
                    <h1>Recuperación de Contraseña</h1>
                    <p>Para recuperar tu contraseña, haz clic en el siguiente enlace:</p>
                    <a href="${url}">Recuperar Contraseña</a>`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({
                            message: "No es posible enviar el correo.",
                            messageDev: "No se envió el correo exitosamente.",
                            code: "ERR_SENt_EMAIL",
                        });
                    }
                    console.log('Correo enviado: ' + info.response);
                    return res.status(200).json({
                        email: emailRecovery,
                    })
                });
            }


        });
    } catch (error) {
        return res.status(500).json({
            message: "Error inesperado, intente más tarde",
            messageDev: error.message,
            code: "ERR_SERVER",
        });
    }


}