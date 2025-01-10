const express = require('express');

const { getStats } = require('../controllers/statsController');
const { getDeviation } = require('../controllers/deviationController');

const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

module.exports = router;