const express = require('express');
const router = express.Router();
const { submitForm } = require('../controlers/controller');
router.post('/', submitForm);

module.exports = router;
