const mongoose = require('mongoose')

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
const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
        trim: true,
      },
      deliveryAddresses: {
        type: [AddressSchema], // This defines an array of addresses
        default: [],
      },
      emergencyContact: {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },
        mobileNumber: {
          type: String,
          required: true,
          trim: true,
        },
      },
    })

module.exports = mongoose.model('Patient',patientSchema)
