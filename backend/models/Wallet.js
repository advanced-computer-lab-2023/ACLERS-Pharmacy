const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0, // Initial balance
  },
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;