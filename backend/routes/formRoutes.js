const express = require('express');
const { submitForm, getForms } = require('../controlers/controller');

const router = express.Router();

router.post('/', submitForm);
router.get('/', getForms);

module.exports = router;
