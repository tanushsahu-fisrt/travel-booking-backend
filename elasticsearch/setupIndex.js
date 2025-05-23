// Manual Index Creation with Mapping
const esClient = require('../utils/elastic');

async function createFlightsIndex() {
  const indexName = 'flights';

  const exists = await esClient.indices.exists({ index: indexName });

  if (exists) {
    console.log(`✅ Index "${indexName}" already exists.`);
    return;
  }

  await esClient.indices.create({
    index: indexName,
    body: {
      mappings: {
        properties: {
          airline: { type: 'text' },
          origin: { type: 'text' },
          destination: { type: 'text' },
          price: { type: 'float' },
        },
      },
    },
  });

  console.log(`Index "${indexName}" created with custom mapping.`);
}

createFlightsIndex().catch(console.error);
