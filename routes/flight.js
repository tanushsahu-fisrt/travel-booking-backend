const express = require('express');
const router = express.Router();
const { addFlight } = require('../controllers/flightController');
const { bookFlight } = require('../controllers/bookingController');

router.post('/add', addFlight);
router.post('/bookFlight',bookFlight);


module.exports = router;
