const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const esClient = new Client({
  node : process.env.ELASTIC_URL ,
});

async function checkConnection() {
  try {
    const health = await esClient.cluster.health({});
    console.log("ElasticSearch connected:", health.status);
  } catch (err) {
    console.error("ElasticSearch connection failed", err);
  }
}

checkConnection();

module.exports = esClient;
