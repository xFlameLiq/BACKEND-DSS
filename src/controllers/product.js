const db = require('../config/db.config');

exports.getProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener los productos de la base de datos" });
        }
        return res.status(200).json(results);
    });
};

exports.createProduct = (req, res) => {
    const { name, model, price } = req.body;
    if (!name || !model || !price) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const sql = 'INSERT INTO products (name, model, price) VALUES (?, ?, ?)';
    db.query(sql, [name, model, price], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al insertar el producto en la base de datos" });
        }
        return res.status(201).json({ message: "Producto insertado exitosamente" });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "El ID del producto es requerido" });
    }
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al eliminar el producto de la base de datos" });
        }
        return res.status(200).json({ message: "Producto eliminado exitosamente" });
    });
};

exports.updateProduct = (req, res) => {
    const { id, name, model, price } = req.body;
    if (!id || !name || !model || !price) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const sql = 'UPDATE products SET name = ?, model = ?, price = ? WHERE id = ?';
    db.query(sql, [name, model, price, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al actualizar el producto en la base de datos" });
        }
        return res.status(200).json({ message: "Producto actualizado exitosamente" });
    });
};
