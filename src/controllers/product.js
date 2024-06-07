const db = require('../config/db.config');

exports.getProducts = (req, res) => {

};

exports.createProduct = (req, res) => {
    const { name, model, price } = req.body;
    
    // Verificar que todos los campos necesarios estén presentes
    if (!name || !model || !price) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Crear la consulta SQL de inserción
    const sql = 'INSERT INTO products (name, model, price) VALUES (?, ?, ?)';
    
    // Ejecutar la consulta SQL con los valores proporcionados
    db.query(sql, [name, model, price], (err, result) => {
        if (err) {
            // Si ocurre un error al ejecutar la consulta, enviar una respuesta de error
            console.error(err);
            return res.status(500).json({ message: "Error al insertar el producto en la base de datos" });
        }

        // Si la inserción fue exitosa, enviar una respuesta de éxito
        return res.status(201).json({ message: "Producto insertado exitosamente" });
    });
};


exports.deleteProduct = (req, res) => {

};

exports.updateProduct = (req, res) => {

};
