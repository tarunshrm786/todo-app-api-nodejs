// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const sessionController = require('../controllers/sessionController');

// router.get('/sessions', auth, sessionController.getSessions);

// module.exports = router;


const express = require('express');
const Session = require('../models/Session');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.send(sessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    res.status(500).send({ message: 'Failed to fetch sessions', error });
  }
});

module.exports = router;
