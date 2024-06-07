const express = require('express');
const router = express.Router();
const {sendEmail} = require('../controllers/password-recovery');

router.post("/password-recovery", sendEmail);

module.exports = router;