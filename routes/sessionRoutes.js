const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

router.get('/sessions', auth, sessionController.getSessions);

module.exports = router;
