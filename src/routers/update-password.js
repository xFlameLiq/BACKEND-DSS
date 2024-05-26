const express = require('express');
const router = express.Router();
const { updatePassword } = require('../controllers//update-password');

router.post("/update-password", updatePassword);

module.exports = router;