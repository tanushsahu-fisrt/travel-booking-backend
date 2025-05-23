const express = require('express');
const router = express.Router();
const { searchFlights } = require('../controllers/searchController');

router.get('/flights', searchFlights);

module.exports = router;
