require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');

async function startEmailConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('emailQueue');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  channel.consume('emailQueue', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await transporter.sendMail(data);
    console.log('Email sent to:', data.to);
    channel.ack(msg);
  });
}

startEmailConsumer();
