// imports
const express = require('express');
const fileController = require('../controllers/file.controller');

// constants
const router = express.Router();

// endpoints
router.post('/', fileController.uploadFile);


// exports
module.exports = router;