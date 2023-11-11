const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the ShoppingCartItem schema
const shoppingCartItemSchema = new Schema({
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

// Define the ShoppingCart schema
const shoppingCartSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  items: [shoppingCartItemSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Define a method to calculate the total price of the shopping cart
shoppingCartSchema.methods.calculateTotalPrice = function () {
  return this.items.reduce((total, item) => {
    return total + item.medicine.price * item.quantity;
  }, 0);
};

// Create the ShoppingCart model
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
