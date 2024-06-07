const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sonicelherizo2002@gmail.com', // Reemplaza con tu correo
        pass: 'rasj zkna gasb hvok'       // Reemplaza con tu contraseña
    }
});

module.exports = transporter;