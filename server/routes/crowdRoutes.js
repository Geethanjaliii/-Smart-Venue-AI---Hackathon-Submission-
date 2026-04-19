const express = require('express');
const { getCrowdData } = require('../controllers/crowdController');

const router = express.Router();

router.get('/', getCrowdData);

module.exports = router;
