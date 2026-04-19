const express = require('express');
const { getQueueTimes } = require('../controllers/queueController');

const router = express.Router();

router.get('/', getQueueTimes);

module.exports = router;
