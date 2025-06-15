const express = require('express');
const router = express.Router();
const { submitForm, getForms } = require('../controlers/controller');

router.post('/', submitForm); // POST route
router.get('/', getForms);   // GET route

module.exports = router;
