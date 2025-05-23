const { getChannel } = require('../utils/rabbitmq');
const Log = require('../models/log');
const Booking = require('../models/booking')

exports.bookFlight = async (req, res) => {
  try {

    // booking Info  save to mongoDB
    const  booking = await Booking.create(req.body);
    
    const bookingEmail = await req.body.email;

    // Log booking action
    await Log.create({
      type: 'booking',
      message: `Flight booked for user ${req.body.userId} & ${req.body.email}`,
      metadata: { bookingId : booking.id },
    });
    
    // Publish email job
    const channel = getChannel();
    
    const emailJob = {
      to: bookingEmail,
      subject: "Booking Confirmation",
      text: `Your booking for flight is confirmed.`,
    };


    channel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(emailJob)), { persistent: true });

    res.status(201).json({ message: "Booking successful and email queued" , bookingEmail });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
