const amqp = require('amqplib');

let channel;

async function connectRabbit() {
  const connection = await amqp.connect( process.env.RABBITMQ_URL );
  channel = await connection.createChannel();
  await channel.assertQueue('emailQueue');
}

function getChannel() {
  return channel;
}

module.exports = { connectRabbit, getChannel };
