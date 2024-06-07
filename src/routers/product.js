const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/product');

router.get('/products', getProducts);
router.post('/products', createProduct);
router.delete('/products', deleteProduct);
router.patch('/products', updateProduct);

module.exports = router;