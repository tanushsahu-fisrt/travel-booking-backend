const esClient = require('../utils/elastic');
const redisClient = require('../utils/redisClient');

exports.searchFlights = async (req, res) => {
  const { q } = req.query; // e.g. q="delhi" or "air india"

  try {
    // check redis cache
    const cached = await redisClient.get(q);
    if(cached){
        console.log('Serving from Redis Cache');
        return res.json( JSON.parse(cached) )
    }

    // Query ElasticSearch if not in cache
    const result = await esClient.search({
      index: 'flights',
      query: {
        multi_match: {
          query: q,
          fields: ['airline', 'origin', 'destination'],
          fuzziness: 'AUTO',
        },
      },
    });

    const hits = result.hits.hits.map( hit => ({
      id: hit._id,
      ...hit._source,
    }));

    // Store result in Redis with TTL of 5 minutes (300 sec)
    await redisClient.set(q,JSON.stringify(hits),{ EX : 600,})

    res.json(hits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
