const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type: String, // e.g. "booking", "error", "user_action"
  message: String,
  timestamp: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed, // flexible field for any extra info
});

module.exports = mongoose.model('Log', logSchema);
