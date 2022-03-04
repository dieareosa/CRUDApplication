
const express = require('express');

const { addTutorial } = require('../controllers/tutorials');
const router = express.Router();

router.route('/').post(addTutorial);

module.exports = router;
