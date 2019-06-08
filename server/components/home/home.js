const express = require('express');
const router = express.Router();

const home_stuff = require('./controllers/home_stuff.js');

// GET
router.get('/', home_stuff);

module.exports = router;
