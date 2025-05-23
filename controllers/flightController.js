const Flight = require('../models/Flight');
const esClient = require('../utils/elastic');

exports.addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);

    await esClient.index({
      index: 'flights',
      id: flight.id.toString(),
      document: {
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        price: flight.price,
      },
    });

    res.status(201).json({ message: "Flight added", flight });

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};
