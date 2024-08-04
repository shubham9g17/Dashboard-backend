const express = require('express');
const { getClicks } = require('../controllers/clickController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getClicks);

module.exports = router;
