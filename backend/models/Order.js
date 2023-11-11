const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the OrderItem schema
const orderItemSchema = new Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});
const AddressSchema = new mongoose.Schema({
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: String,
    city: {
      type: String,
      required: true,
    },
    state: String,
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  });
// Define the Order schema
const orderSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  items: [orderItemSchema],
  deliveryAddress: {
    type: AddressSchema,
    
  },
  status: {
    type: String,
    enum: ['Placed','Pending','Delivered','Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Wallet', 'COD'],
    
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
